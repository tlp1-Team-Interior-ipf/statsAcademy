import { EventModel } from '../models/event.js';

export async function getAllEvents() {
    try {
        const events = await EventModel.findAll({
            where: {
                user: user
            } 
        });

        if (!events || events.length === 0) {
            throw new Error('No events found');
        }

        return events;

    } catch (error) {
        throw error;
    }
};

export async function createEvent () {
    const { date, event, userId } = req.body;
    try {
        const newEvent = await EventModel.create({ event, date, userId });
        return newEvent;
    } catch (error) {
        throw error;
    }
};
