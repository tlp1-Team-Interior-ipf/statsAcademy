import { Temas } from "../models/temas.js";
import { DatabaseError } from "../utils/errorHandler.js";


export const getNextTopic = async () => {
    try {
        const lastTopic = await Temas.findOne({
            where: { estado: 'no dictado' },
            order: [['id', 'ASC']],
        });
        return lastTopic;
    } catch (error) {
        DatabaseError(error);
    };
};

export const updateTopicStatus = async (topicId) => {
    try {
        await Temas.update({ estado: 'dictado' }, { where: { id: topicId } });
    } catch (error) {
        DatabaseError(error);
    };
};