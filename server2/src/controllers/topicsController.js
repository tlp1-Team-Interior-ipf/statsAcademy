import { createTopic } from "../services/topicsServices.js";


export const createTopicController = async (req, res) => {
    try {
        const topic = req.body;
        const newTopic = await createTopic(topic);
        res.status(201).json(newTopic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};