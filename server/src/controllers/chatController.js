import { FetchModelResponse, ChatHistory } from "../services/chatService.js";
import { responseHandler } from "../utils/responseHandler.js";

export const ChatController = async (req, res, next) => {

    const { id } = req.params;
    const { question } = req.body;
    
    try {
        if (!id || isNaN(id)) {
            throw new Error('El ID del usuario debe ser un número');
        };
        const userId = parseInt(id);
        console.log(`id: ${userId}, question: ${question}`);
        const response = await FetchModelResponse(question, userId);
        responseHandler(res, 200, response);
    } catch (error) {
        next(error);
    };
};


export const ChatHistoryController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const history = await ChatHistory(id);
        responseHandler(res, 200, history);
    } catch (error) {
        next(error);
    };
};