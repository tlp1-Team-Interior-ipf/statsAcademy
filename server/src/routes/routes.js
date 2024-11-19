import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import topicRouter from './topicRoutes.js';
import progressRouter from './progressRoutes.js';
import chatRouter from './chatRoutes.js';
import EventRouter from './calendarEventRoutes.js';
import taskRouter from './taskRoutes.js';
import ratingsRouter from './ratingsRoutes.js';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', userRouter);
routes.use('/topic', topicRouter);
routes.use('/progress', progressRouter);
routes.use('/chat', chatRouter);
routes.use('/calendarEvent', EventRouter);
routes.use('/task', taskRouter);
routes.use('/ratings', ratingsRouter);

export default routes;