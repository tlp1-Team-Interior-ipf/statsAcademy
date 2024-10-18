import { Router } from 'express';

import { validator } from '../middlewares/validator.js';
import { CreateEvent, GetAllEvents } from '../controllers/eventController.js';

const CalendarEvents = Router();

// Ruta para obtener todos los eventos (requiere autenticación)
CalendarEvents.get('/', GetAllEvents);

// Ruta para crear un nuevo evento
CalendarEvents.post('/', createUserSchema, validator, CreateEvent);

// Ruta para actualizar un evento existente por ID (requiere autenticación)
// CalendarEvents.put('/:id', authenticateUser, UpdateEvent);

// Ruta para eliminar un evento por ID (requiere autenticación)
// CalendarEvents.delete('/:id', authenticateUser, DeleteEvent);

export default CalendarEvents;