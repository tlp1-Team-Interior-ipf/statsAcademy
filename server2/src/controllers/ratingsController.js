import { getRatings } from "../services/ratingService.js";
import { responseHandler } from "../utils/responseHandler.js";


export const getRatingsController = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const ratings = await getRatings(userId);

        if (ratings !== null) {
            responseHandler(res, 200, ratings);
        } else {
            responseHandler(res, 404, null);
        };
    } catch (error) {
        next(error);
    };
};