import { EventModel } from '../models/event.js';
import { findUserById } from '../utils/findUser.js';
import { DatabaseError } from '../utils/errorHandler.js';


export const createEvent = async (eventData) => {
    const { date, event: eventDescription, userId } = eventData;
    try {
        const existingUser = await findUserById(userId);
        console.log("usuario encontrado: ", existingUser);
        
        if (!existingUser) {
            throw new Error('User not found');
        };
        const newEvent = await EventModel.create({
            date: date,
            event: eventDescription,
            userId: userId,
        });
        return newEvent;
    } catch (error) {
        DatabaseError(error);
    };
};


export const getAllEvents = async (userId) => {
    try {
        const events = await EventModel.findAll({
            where: {
                userId: userId,
            },
        });
        if (!events) {
            throw new Error('Events not found');
        };
        return events;
    } catch (error) {
        DatabaseError(error);
    };
};


export const updateEvent = async (eventId, eventData) => {
    const { date, event: eventDescription } = eventData;
    try {
        const event = await EventModel.findByPk(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        event.date = date;
        event.event = eventDescription;
        await event.save();
        return event;
    } catch (error) {
        DatabaseError(error);
    };
};


export const deleteEvent = async (eventId) => {
    try {
        const event = await EventModel.findByPk(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        await event.destroy();
        return event;
    } catch (error) {
        DatabaseError(error);
    };
};