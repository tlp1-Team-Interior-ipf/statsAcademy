import { createTopic } from "../services/topicsServices.js";
import { getAllTopics } from "../helpers/TopicsHelpers.js";


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