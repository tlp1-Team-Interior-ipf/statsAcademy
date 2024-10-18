import { createEvent, getAllEvents } from '../services/eventService.js';

export const CreateEvent = async (req, res) => {
    try {
        const event = await createEvent(req.body);
        res.status(201).json({ event });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
export const GetEvents = async (_req, res) => {
    try {
        const Events = await getAllEvents();

        if (!Events || Events.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.status(200).json(Events);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
// export const UpdateEvent = async (req, res) => {
//     try {
        
//     } catch (error) {
//         res.status(500).json({ message: 'Error en el servidor' })
//     }
// }
// export const DeleteEvent = async (req, res) => {
//     try {
        
//     } catch (error) {
//         res.status(500).json({ message: 'Error en el servidor' })
//     }
// }