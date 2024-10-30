import { Chat } from "../models/modelChat.js";
import { DatabaseError } from "../utils/errorHandler.js";
import { getChatHistory } from "../helpers/ChatHistory.js";
import { getNextTopic, updateTopicStatus } from "../helpers/TopicsHelpers.js";
import { fetchOpenAIResponse, evaluateResponse } from "../utils/OpenAiClient.js";


// Función para interactuar con la API de OpenAI
export const FetchModelResponse = async ( message, userId ) => {
    try {
        const chatHistory = await getChatHistory(userId);
        const nextTopic = await getNextTopic();

        let previousContext = chatHistory.map(chat => ({
            role: chat.sender === 'user' ? 'user' : 'assistant',
            content: chat.message,
        }));

        // Inicia con el mensaje basado en el tema pedagógico
        const systemMessage = {
            role: 'system',
            content: `Eres un tutor especializado en estadística, tu tarea es enseñar a los estudiantes de una manera clara, estructurada y motivadora, y solo sobre los temas dados en las unidades tematicas, no enseñes algo que no este ahi, si te preguntan algo que no esta dentro de los temas a dar, o que directamente no tenga ninguna relación con la estadistica, dile que eres un profesor esppecializado en estadistica y no estas entrenado para responder ese tipo de preguntas, pero no respondas nada que no este estrechamente relacionado al tema. Vamos a trabajar con los siguientes temas: ${nextTopic.nombre}. ${nextTopic.descripcion}.`
        };

        // Agrega el mensaje del usuario al contexto previo
        previousContext.push({
            role: 'user',
            content: message,
        });

        const modelResponse = await fetchOpenAIResponse([ systemMessage, ...previousContext
        ]);

        await Chat.create({ userId, message: message, sender: 'user' });
        await Chat.create({ userId, message: modelResponse, sender: 'assistant' });

        const comprehensionLevel = await evaluateResponse(modelResponse);
        console.log(comprehensionLevel);
        if (comprehensionLevel >= 70) {
            await updateTopicStatus( nextTopic.id, userId);
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