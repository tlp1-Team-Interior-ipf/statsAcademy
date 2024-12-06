import { createTopic, getCompletedTopicsByUser, getTopics } from "../services/topicsServices.js";
import { getAllTopics } from "../helpers/TopicsHelpers.js";
import { responseHandler } from "../utils/responseHandler.js";


export const createTopicController = async (req, res) => {
    try {
        const topic = req.body;
        const newTopic = await createTopic(topic);
        res.status(201).json(newTopic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getAllTopicsController = async (req, res) => {
    try {
        const topics = await getAllTopics();
        res.status(200).json(topics);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getTopicsController = async (req, res, next) => {
    try {
        const topics = await getTopics();
        responseHandler(res, 200, topics);
    } catch (error) {
        next(error);
    };
};

export const getCompletedTopicsByUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Obteniendo temas completados para el usuario:", userId);
        
        const completedTopics = await getCompletedTopicsByUser(userId);

        // Si no se encontraron temas
        if (completedTopics.length === 0) {
            return res.status(404).json({ message: "No se encontraron temas completados para este usuario." });
        }
        
        res.status(200).json({ completedCount: completedTopics.length, topics: completedTopics });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};