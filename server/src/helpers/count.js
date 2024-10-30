import { Topic } from "../models/Topic.js";


export const countTopics = async () => {
    try {
        const count = await Topic.count();
        return count;
    } catch (error) {
        throw new Error(error);
    };
};


export const countTopicsDictated = async () => {
    try {
        const count = await Topic.count({ where: { status: 'dictated' } });
        return count;
    } catch (error) {
        throw new Error(error);
    };
};