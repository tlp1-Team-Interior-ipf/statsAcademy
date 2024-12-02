import { Topic } from "../models/Topic.js";
import { Units } from "../models/Units.js";
import { DatabaseError } from "../utils/errorHandler.js";

export const createTopic = async (topic) => {
    try {
        return await Topic.create(topic);
    } catch (error) {
        throw new Error('Error en la creación del tema');
    };
};


export const getTopics = async () => {
    try {
        const topics = await Topic.findAll({
            include: {
                model: Units,
                as: 'units',
                attributes: ['name'],
            },
            attributes: ['id', 'name', 'status', 'unitsId'],
            order: [['id', 'ASC']],
        });
        return topics;
    } catch (error) {
        DatabaseError('Error en la búsqueda de temas', error);
    };
};