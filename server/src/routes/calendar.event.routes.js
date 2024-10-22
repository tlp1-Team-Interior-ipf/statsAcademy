import { Router } from 'express';

import { CreateEvent, GetEvents, UpdateEvent, DeleteEvent } from '../controllers/eventController.js';

const CalendarEvents = Router();

// Ruta para obtener todos los eventos (requiere autenticación)
CalendarEvents.get('/', GetEvents);

// Ruta para crear un nuevo evento
CalendarEvents.post('/', CreateEvent);

// Ruta para actualizar un evento existente por ID (requiere autenticación)
CalendarEvents.put('/:id', UpdateEvent);

// Ruta para eliminar un evento por ID (requiere autenticación)
CalendarEvents.delete('/:id', DeleteEvent);

export default CalendarEvents;