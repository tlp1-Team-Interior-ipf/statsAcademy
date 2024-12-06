import { Chat } from "../models/modelChat.js";
import { DatabaseError } from "../utils/errorHandler.js";


export const getChatHistory = async (userId) => {
    try {
        const history = await Chat.findAll({
            where: { userId },
            order: [['createdAt', 'ASC']],
        });
        return history;
    } catch (error) {
        DatabaseError(error);
    };
};