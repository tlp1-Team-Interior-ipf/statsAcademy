import { Topic } from "../models/Topic.js";
import { Units } from "../models/Units.js";
import { DatabaseError } from "../utils/errorHandler.js";
import { Ratings } from "../models/Ratings.js";

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

export const getCompletedTopicsByUser = async (userId) => {
    try {
        // Buscamos todas las calificaciones de un usuario
        const completedTopics = await Ratings.findAll({
            where: { userId },
            include: {
                model: Topic,
                as: 'topics',  // Asegúrate de que esto coincida con el alias de la relación
                attributes: ['id', 'name'],
            },
        });

        // console.log("cantidad:", completedTopics);
        

        if (!completedTopics || completedTopics.length === 0) {
            console.log("No se encontraron temas completados para el usuario.");
        }

        // Mapeamos para obtener solo los temas
        return completedTopics.map((rating) => rating.topic);
    } catch (error) {
        console.error("Error en la función getCompletedTopicsByUser:", error);
        throw new Error("Error obteniendo temas completados por el usuario");
    }
};