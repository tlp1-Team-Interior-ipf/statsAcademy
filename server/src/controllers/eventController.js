import { createEvent, getAllEvents, updateEvent, deleteEvent } from '../services/eventService.js';
import jwt from 'jsonwebtoken'

export const CreateEvent = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if(!token) {
            return res.status(403).json({error: "No token found"})
        }

        const user = jwt.verify(token, process.env.SECRET_KEY);

        const userId = user.user;
        
        const eventData = {...req.body, userId};

        const event = await createEvent(eventData);

        res.status(201).json({ event });
    } catch (error) {
        console.error("error: ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
export const GetEvents = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const userId = user.user
        if(!userId) {
            res.status(400).json({ error: "No se ha proporcionado el ID del usuario" })
        }

        const Events = await getAllEvents(userId);

        if (!Events || Events.length === 0) {
            return res.status(404).json({ error: 'No events found' });
        }

        res.status(200).json(Events);
    } catch (error) {
        console.error("error: ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
export const UpdateEvent = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedEvent = updateEvent(userId, req.body);
        if(!updatedEvent) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}
export const DeleteEvent = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedEvent = deleteEvent(userId)
        if(!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(deletedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' })
    }
}