import {
    getProgreso,
    calcularProgreso
} from '../services/progresoService.js';
import { responseHandler } from '../utils/responseHandler.js';


export const getProgresoController = async (req, res, next) => {
    try {
        const { userId } = req.params.id;
        const progreso = await getProgreso(userId);

        if (progreso !== null) {
            responseHandler(res, 200, progreso);
        } else {
            responseHandler(res, 404, null);
        };
    } catch (error) {
        next(error);
    };
};


export const calcularProgresoController = async (req, res, next) => {
    try {
        const { userId } = req.params.id;
        const progreso = await calcularProgreso(userId);

        responseHandler(res, 200, progreso);
    } catch (error) {
        next(error);
    };
};