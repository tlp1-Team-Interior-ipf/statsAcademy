import { Chat } from "../models/modelChat.js";
import { Ratings } from "../models/Ratings.js";
import { DatabaseError } from "../utils/errorHandler.js";
import { getChatHistory } from "../helpers/ChatHistory.js";
import { getNextTopic, updateTopicStatus } from "../helpers/TopicsHelpers.js";
import { fetchOpenAIResponse, evaluateResponse, generateQuestionsForTopic } from "../utils/OpenAiClient.js";


// Función para interactuar con la API de OpenAI
export const FetchModelResponse = async ( message, userId ) => {
    try {
        const chatHistory = await getChatHistory(userId);
        const nextTopic = await getNextTopic();

        // Define un estado para el usuario
        const userState = chatHistory.some(chat => chat.message.includes('Estas son las preguntas de evaluación')) 
        ? 'evaluation' 
        : 'teaching';
        console.log("Estado del usuario:", userState);

        if ( userState === 'teaching' ) {
            // Genera preguntas sobre el tema actual
            const questions = await generateQuestionsForTopic(nextTopic.name);
            console.log("Preguntas generadas:", questions);

            const systemMessage = {
                role: 'system',
                content: `Eres un tutor especializado en estadística. Enseña el tema: ${nextTopic.name}. ${nextTopic.description}. Una vez finalizado, evalúa al usuario con estas preguntas: ${questions.join(', ')}`
            };

            let previousContext = chatHistory.map(chat => ({
                role: chat.sender === 'user' ? 'user' : 'assistant',
                content: chat.message,
            }));

            // Inicia con el mensaje basado en el tema pedagógico
            // const systemMessage = {
            //     role: 'system',
            //     content: `Eres un tutor especializado en estadística, tu tarea es enseñar a los estudiantes de una manera clara, estructurada y motivadora, y solo sobre los temas dados en las unidades tematicas, no enseñes algo que no este ahi, si te preguntan algo que no esta dentro de los temas a dar, o que directamente no tenga ninguna relación con la estadistica, dile que eres un profesor esppecializado en estadistica y no estas entrenado para responder ese tipo de preguntas, pero no respondas nada que no este estrechamente relacionado al tema. Vamos a trabajar con los siguientes temas: ${nextTopic.name}. ${nextTopic.description}.Las preguntas de evaluación son: ${questions.join(', ')}`
            // };

            // Agrega el mensaje del usuario al contexto previo
            previousContext.push({
                role: 'user',
                content: message,
            });

            const modelResponse = await fetchOpenAIResponse([ systemMessage, ...previousContext
            ]);

            await Chat.create({ userId, message: message, sender: 'user' });
            await Chat.create({ userId, message: modelResponse, sender: 'assistant' });

            // Iniciar evaluación
            const evaluationIntro = 'Estas son las preguntas de evaluación:';
            await Chat.create({ userId, message: `${evaluationIntro}\n${questions.join('\n')}`, sender: 'assistant' });

            return `${modelResponse}\n\n${evaluationIntro}\n${questions.join('\n')}`;
        };

        if (userState === 'evaluation') {
            const lastQuestions = chatHistory.find(chat => chat.message.includes('Estas son las preguntas de evaluación')).message;
            const questions = lastQuestions.split('\n').slice(1); // Obtiene las preguntas generadas
            console.log("Preguntas de evaluación en modo evaluación:", questions);

            // Verificar si la respuesta es relevante
            const relevantQuestion = questions.find(q => {
                const keywords = q.split(' ').filter(word => word.length > 3);
                return keywords.some(keyword => message.includes(keyword));
            });
            console.log("Pregunta relevante:", relevantQuestion);
            if (!relevantQuestion) {
                return 'Por favor, responde a las preguntas de evaluación.';
            }
                const comprehensionLevel = await evaluateResponse(message);
                await Ratings.create({ userId, topicId: nextTopic.id, note: comprehensionLevel });
                console.log('Nivel de comprensión:', comprehensionLevel);
            if (comprehensionLevel >= 70) {
                await updateTopicStatus( nextTopic.id, userId);
                return '¡Excelente! Has demostrado un buen entendimiento del tema. Puedes continuar con el siguiente tema.';
            } else {
                return 'Tu respuesta no demuestra un buen entendimiento del tema. Por favor, intenta de nuevo.';
            };
        };

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