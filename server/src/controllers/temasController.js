import { createTema } from "../services/temasServices.js";


export const createTemaController = async (req, res) => {
    try {
        const tema = req.body;
        const newTema = await createTema(tema);
        res.status(201).json(newTema);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};