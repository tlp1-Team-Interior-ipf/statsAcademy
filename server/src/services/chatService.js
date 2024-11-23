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

        // Formatea los temas en una lista legible
        const formattedTopics = topics.map(topic => `${topic.id}. ${topic.name}`).join('\n');

        const systemMessage = {
            role: 'system',
            content: `
                Eres un tutor especializado en estadística. Los temas que debes enseñar son estos: ${formattedTopics}. 
                El tema actual es: ${nextTopic.name}. ${nextTopic.description}.
                
                Cuando el usuario esté listo, realiza preguntas para evaluar su comprensión del tema actual (${nextTopic.name}).
                Si el usuario no está respondiendo preguntas de evaluación, entonces continúa enseñando o resolviendo dudas sobre el tema.
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

        // Si no hace referencia a preguntas, continuar enseñando
        await Chat.create({ userId, message: message, sender: 'user' });
        await Chat.create({ userId, message: modelResponse, sender: 'assistant' });

        const comprehensionLevel = await handleEvaluation(message, userId, nextTopic);
        console.log(comprehensionLevel);

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