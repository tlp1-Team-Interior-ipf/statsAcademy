import { Progreso } from '../models/progreso.js';
import { countTemas, countTemasDictados } from '../helpers/count.js';
import { DatabaseError } from '../utils/errorHandler.js';
 

export const calcularProgreso = async (userId) => {
    try {
        const totalTemas = await countTemas();
        const temasDictados = await countTemasDictados();

        if (totalTemas === 0) {
            return 0;
        };

        const porcentajeProgreso = (temasDictados / totalTemas) * 100;

        const saveProgreso = await Progreso.upsert({
            userId: userId,
            progreso: porcentajeProgreso.toFixed(2)
        });

        return saveProgreso;

    } catch (error) {
        DatabaseError(error);
    };
};


export const getProgreso = async (userId) => {
    try {
        const progreso = await Progreso.findOne({ userId: userId });
        return progreso ? progreso.progreso : null;
    } catch (error) {
        DatabaseError(error);
    };
};