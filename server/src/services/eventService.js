import { EventModel } from '../models/event.js';
import { UserModel } from '../models/user.js';

export async function createEvent (eventData) {
    const { date, event: eventDescription, userId } = eventData;
    try {
        const existUser = await UserModel.findByPk(userId)

        if(!existUser) {
            throw new Error("No user found")
        }

        const newEvent = await EventModel.create({ event: eventDescription, date, userId });
        return newEvent;
    } catch (error) {
        throw error
    }
};

export async function getAllEvents(userId) {
    try {
        const events = await EventModel.findAll({
            where: {
                userId: userId
            } 
        });

        // if (!events || events.length === 0) {
        //     throw new Error('No events found');
        // }

        return events;
    } catch (error) {
        console.error("Error in the event service: ", error)
        throw error
    }
};

export async function updateEvent(userId, eventData) {
    try {
        const existingEvent = await EventModel.findByPk(userId);
        
        const updatedEvent = existingEvent.update(eventData);
        return updatedEvent

    } catch (error) {
        console.error("Error in the event service: ", error)
        throw error
    }
};

export async function deleteEvent(userId) {
    try {
        const event = await EventModel.findByPk(userId);
        
        await event.destroy();
        return { message: 'Event deleted successfully' };

    } catch (error) {
        console.error("Error in the event service: ", error)
        throw error
    }
};