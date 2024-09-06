import { fetchModelResponse } from "../services/modelServices.js";

export const askModel = async (req, res, next) => {
    try {
        const { question, userId } = req.body;
        console.log(`Received question: ${question}`);

        if (typeof question !== 'string') {
            return res.status(400).json({ error: "La pregunta debe ser una cadena" });
        }

        const response = await fetchModelResponse(question, userId);
        console.log(`Model response: ${response}`);
        res.json({ response });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        next(error);
    }
};