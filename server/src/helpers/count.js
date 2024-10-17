import { Temas } from "../models/temas.js";


export const countTemas = async () => {
    try {
        const count = await Temas.count();
        return count;
    } catch (error) {
        throw new Error(error);
    };
};


export const countTemasDictados = async () => {
    try {
        const count = await Temas.count({ where: { estado: 'dictado' } });
        return count;
    } catch (error) {
        throw new Error(error);
    };
};