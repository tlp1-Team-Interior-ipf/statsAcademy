import { Temas } from "../models/temas.js";

export const createTema = async (tema) => {
    try {
        return await Temas.create(tema);
    } catch (error) {
        throw new Error('Error en la creación del tema');
    };
};