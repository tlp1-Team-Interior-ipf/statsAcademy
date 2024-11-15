import { Router } from 'express';
import {
    createEventController,
    deleteEventController,
    getAllEventsController,
    updateEventController,
} from '../controllers/eventController.js';

const EventRouter = Router();

EventRouter.get('/:id', getAllEventsController);
EventRouter.post('/:id', createEventController);
EventRouter.put('/:id', updateEventController);
EventRouter.delete('/:id', deleteEventController);


export default EventRouter;