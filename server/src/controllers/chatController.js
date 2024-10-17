import { FetchModelResponse } from "../services/chatService.js";
import { responseHandler } from "../utils/responseHandler.js";

export const ChatController = async (req, res, next) => {

    const { id } = req.params;
    const { question } = req.body;
    
    try {
        const response = await FetchModelResponse(id, question);
        responseHandler(res, 200, response);
    } catch (error) {
        next(error);
    };
};