import { Ratings } from '../models/Ratings.js';
import { Topic } from '../models/Topic.js';
import { DatabaseError } from '../utils/errorHandler.js';

export const getRatings = async (userId) => {
    try {
        const ratings = await Ratings.findAll({ 
            where: { userId },
            include: [
                {
                    model: Topic,
                    as: 'topics',
                    attributes: ['name'],
                },
            ],
         });

        return ratings;
    } catch (error) {
        DatabaseError(error);
    }
};