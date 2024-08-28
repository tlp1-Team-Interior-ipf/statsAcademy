import { Chat } from "../models/modelChat.js";

export const fetchModelResponse = async (inputText, userId) => {
    try {
        const response = await fetch(`http://0.0.0.0:8000/ask?question=${encodeURIComponent(inputText)}`);
        if (!response.ok) {
            const errorDetail = await response.text();
            throw new Error(`Error al obtener la respuesta del modelo: ${response.status} ${response.statusText} - ${errorDetail}`);
        }
        const data = await response.json();

        // Guardar la pregunta y respuesta en la base de datos
        await Chat.create({ userId, message: inputText, response: data.response });

        return data.response;
    } catch (error) {
        console.error(`Error al obtener la respuesta del modelo: ${error.message}`);
        throw error;
    }
};