import { Topic } from "../models/Topic.js";
import { DatabaseError } from "../utils/errorHandler.js";
import { calculateProgress } from '../services/progressService.js';


export const getNextTopic = async () => {
    try {
        const lastTopic = await Topic.findOne({
            where: { status: 'not dictated' },
            order: [['id', 'ASC']],
        });
        return lastTopic;
    } catch (error) {
        DatabaseError(error);
    };
};

export const updateTopicStatus = async (topicId, userId) => {
    try {
        await Topic.update({ status: 'dictated' }, { where: { id: topicId } });
        await calculateProgress(userId);
    } catch (error) {
        DatabaseError(error);
    };
};


export const getAllTopics = async () => {
    try {
        const topics = await Topic.findAll({
            attributes: ['id', 'name'],
            order: [['id', 'ASC']],
        });
        return topics;
    } catch (error) {
        DatabaseError(error);
    };
}