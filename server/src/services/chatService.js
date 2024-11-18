import { Chat } from "../models/modelChat.js";
import { Ratings } from "../models/Ratings.js";
import { DatabaseError } from "../utils/errorHandler.js";
import { getChatHistory } from "../helpers/ChatHistory.js";
import { getNextTopic } from "../helpers/TopicsHelpers.js";
import { fetchOpenAIResponse, generateQuestionsForTopic, handleEvaluation } from "../utils/OpenAiClient.js";


// Función para interactuar con la API de OpenAI
export const FetchModelResponse = async ( message, userId ) => {
    try {
        const chatHistory = await getChatHistory(userId);
        const nextTopic = await getNextTopic();

        const systemMessage = {
            role: 'system',
            content: `Eres un tutor especializado en estadística. Enseña el tema: ${nextTopic.name}. ${nextTopic.description}. Evalúa las respuestas solo si claramente hacen referencia a las preguntas de evaluación. Si el usuario no está respondiendo preguntas de evaluación, entonces continúa enseñando o resolviendo dudas sobre el tema.`
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
        const lastQuestions = chatHistory.find(chat =>
            chat.message.includes('Estas son las preguntas de evaluación')
        )?.message;
        const questions = lastQuestions ? lastQuestions.split('\n').slice(1) : [];
        const relevantQuestion = questions.find(q => message.includes(q));

        if (relevantQuestion) {
            return await handleEvaluation(message, nextTopic, userId);
        }

        // Si el tema aún no ha sido completado, genera preguntas
        const hasQuestions = chatHistory.some(chat =>
            chat.message.includes('Estas son las preguntas de evaluación')
        );

        if (!hasQuestions) {
            const questions = await generateQuestionsForTopic(nextTopic);
            const questionsMessage = `Estas son las preguntas de evaluación:\n${questions.join('\n')}`;

            // Guarda las preguntas y las devuelve al usuario
            await Chat.create({ userId, message: questionsMessage, sender: 'assistant' });
            return questionsMessage;
        }

        // Si no hace referencia a preguntas, continuar enseñando
        await Chat.create({ userId, message: message, sender: 'user' });
        await Chat.create({ userId, message: modelResponse, sender: 'assistant' });

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