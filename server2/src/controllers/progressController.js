import {
    getProgress,
    calculateProgress
} from '../services/progressService.js';
import { responseHandler } from '../utils/responseHandler.js';


export const getProgressController = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const progress = await getProgress(userId);

        if (progress !== null) {
            responseHandler(res, 200, progress);
        } else {
            responseHandler(res, 404, null);
        };
    } catch (error) {
        next(error);
    };
};


export const calculateProgressController = async (req, res, next) => {
    try {
        const { userId } = req.params.id;
        const progress = await calculateProgress(userId);

        responseHandler(res, 200, progress);
    } catch (error) {
        next(error);
    };
};