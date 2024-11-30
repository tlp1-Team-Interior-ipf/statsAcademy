import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../services/eventService.js';
import { responseHandler } from '../utils/responseHandler.js';


export const createEventController = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("id:", id)
        const { date, event } = req.body;
        const eventData = {
            date,
            event,
            userId: id,
        };
        const newEvent = await createEvent(eventData);
        responseHandler(res, 201, newEvent);
    } catch (error) {
        next(error);
    };
};


export const getAllEventsController = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("id 2: ", id)
        const events = await getAllEvents(id);
        if (!events) {
            responseHandler(res, 404, 'Events not found');
        };
        responseHandler(res, 200, events);
    } catch (error) {
        next(error);
    };
};


export const updateEventController = async (req, res, next) => {
    try {
        const id = req.params;
        const { date, event } = req.body;
        const eventData = {
            date,
            event,
        };
        const updatedEvent = await updateEvent(id, eventData);
        if (!updatedEvent) {
            responseHandler(res, 404, 'Event not found');
        };
        responseHandler(res, 200, updatedEvent);
    } catch (error) {
        next(error);
    };
};


export const deleteEventController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedEvent = await deleteEvent(id);
        if (!deletedEvent) {
            responseHandler(res, 404, 'Event not found');
        };
        responseHandler(res, 200, 'Event deleted');
    } catch (error) {
        next(error);
    };
};