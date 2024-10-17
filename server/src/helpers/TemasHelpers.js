import { Temas } from "../models/temas.js";
import { DatabaseError } from "../utils/errorHandler.js";


export const getNextTopic = async (userId) => {
    try {
        const lastTopic = await Temas.findOne({
            where: { userId, estado: 'no dictado' },
            order: [['createdAt', 'DESC']],
        });
        return lastTopic;
    } catch (error) {
        DatabaseError(error);
    };
};

export const updateTopicStatus = async (userId, topicId) => {
    try {
        await Temas.update({ estado: 'dictado' }, { where: { userId, id: topicId } });
    } catch (error) {
        DatabaseError(error);
    };
};