import { Topic } from "../models/Topic.js";

export const createTopic = async (topic) => {
    try {
        return await Topic.create(topic);
    } catch (error) {
        throw new Error('Error en la creación del tema');
    };
};