import { Router } from 'express';
import userRouter from './user.routes.js';
import modelRouter from './model.Routes.js';
import CalendarEvents from './calendar.event.routes.js';

const router = Router();

router.use('/users', userRouter);
router.use(modelRouter);
router.use('/calendarEvent', CalendarEvents)

export { router };