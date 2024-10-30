import { Progress } from '../models/Progress.js';
import { countTopics, countTopicsDictated } from '../helpers/count.js';
import { DatabaseError } from '../utils/errorHandler.js';

 

export const calculateProgress = async (userId) => {
    try {
        const totalTopics = await countTopics();
        const topicsDictated = await countTopicsDictated();

        if (totalTopics === 0) {
            return 0;
        };

        const percentageProgress = (topicsDictated / totalTopics) * 100;

        const saveProgress = await Progress.upsert({
            userId: userId,
            progress: percentageProgress.toFixed(2)
        },
        {
        where: { userId: userId }
        });

        return saveProgress;

    } catch (error) {
        DatabaseError(error);
    };
};


export const getProgress = async (userId) => {
    try {
        const progress = await Progress.findOne({ where: { userId: userId } });
        return progress ? progress.progress : null;
    } catch (error) {
        DatabaseError(error);
    };
};