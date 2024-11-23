import { Chat } from "../models/modelChat.js";
import { DatabaseError } from "../utils/errorHandler.js";
import { getChatHistory } from "../helpers/ChatHistory.js";
import { getNextTopic, getAllTopics, updateTopicStatus } from "../helpers/TopicsHelpers.js";
import { fetchOpenAIResponse, generateQuestionsForTopic, handleEvaluation } from "../utils/OpenAiClient.js";
import { Ratings } from "../models/Ratings.js";


// Función para interactuar con la API de OpenAI
export const FetchModelResponse = async ( message, userId ) => {
    try {
        const chatHistory = await getChatHistory(userId);
        const nextTopic = await getNextTopic();
        const topics = await getAllTopics();

        const systemMessage = {
            role: 'system',
            content: `
                Eres un tutor especializado en estadística. Los temas que debes enseñar son estos: ${topics}. 
                El tema actual es: ${nextTopic.name}. ${nextTopic.description}.
                
                Cuando el usuario esté listo, realiza preguntas para evaluar su comprensión del tema actual (${nextTopic.name}).
                Evalúa el total de las respuestas en un rango de 0 a 100 para medir el nivel de comprensión en porcentaje, solo si hacen referencia directa a las preguntas de evaluación, si no solo no hagas una devolución.
                haz una devolución de la evaluación, si no solo no hagas una devolución, al finalizar no olvides devolver su nota de 0 a 100. 
                Si la respuesta no es evaluable, indica "No evaluable". Además, continúa enseñando o resolviendo dudas en caso de no estar evaluando.
            `,
        };

        // Si no hay historial de chat, se crea uno nuevo
        const previousContext = chatHistory.map(chat => ({
            role: chat.sender === 'user' ? 'user' : 'assistant',
            content: chat.message,
        }));

        // Se añade el mensaje del usuario al historial
        previousContext.push({
            role: 'user',
            content: message,
        });

        const modelResponse = await fetchOpenAIResponse([systemMessage, ...previousContext]);

        // Verifica si el mensaje del usuario es una respuesta a una pregunta de evaluación
        // const lastQuestions = chatHistory.find(chat =>
        //     chat.message.includes('Estas son las preguntas de evaluación')
        // )?.message;
        // const questions = lastQuestions ? lastQuestions.split('\n').slice(1) : [];
        // const relevantQuestion = questions.find(q => message.includes(q));

        // if (relevantQuestion) {
        //     return await handleEvaluation(message, nextTopic.name, userId);
        // }

        // // Si el tema aún no ha sido completado, genera preguntas
        // const hasQuestions = chatHistory.some(chat =>
        //     chat.message.includes('Estas son las preguntas de evaluación')
        // );

        // if (!hasQuestions) {
        //     const questions = await generateQuestionsForTopic(nextTopic.name);
        //     const questionsMessage = `Estas son las preguntas de evaluación:\n${questions.join('\n')}`;

            // Guarda las preguntas y las devuelve al usuario
        //     await Chat.create({ userId, message: questionsMessage, sender: 'assistant' });
        //     return questionsMessage;
        // }

        // Extraer posible evaluación del mensaje del modelo
        const evaluationRegex = /(\d{1,3})/; // Busca números de 0 a 100
        const match = modelResponse.match(evaluationRegex);
        const comprehensionLevel = match ? parseInt(match[1], 10) : null;
        console.log(comprehensionLevel);

        // Si no hace referencia a preguntas, continuar enseñando
        await Chat.create({ userId, message: message, sender: 'user' });
        await Chat.create({ userId, message: modelResponse, sender: 'assistant' });

        // Si se generó una evaluación válida, guardarla en la tabla de Ratings
        if (comprehensionLevel !== null && comprehensionLevel >= 0 && comprehensionLevel <= 100) {
            await Ratings.create({
                userId,
                topicId: nextTopic.id,
                note: comprehensionLevel,
            });

            // Verificar si el usuario está listo para pasar al siguiente tema
            if (comprehensionLevel >= 70) {
                await updateTopicStatus(nextTopic.id, userId);
                return '¡Excelente! Has demostrado un buen entendimiento del tema. Puedes continuar con el siguiente tema.';
            } else {
                return 'Tu respuesta no demuestra un buen entendimiento del tema. Sigamos trabajando en este tema.';
            }
        }

        return modelResponse;

    } catch (error) {
        DatabaseError(error);
    };
};


export const ChatHistory = async ( userId ) => {
    try {
        const chatHistory = await getChatHistory(userId);
        if (!chatHistory) {
            throw new Error('No se encontró historial de chat');
        };
        return chatHistory;
    } catch (error) {
        DatabaseError(error);
    };
};