import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import topicRouter from './topicRoutes.js';
import progressRouter from './progressRoutes.js';
import chatRouter from './chatRoutes.js';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', userRouter);
routes.use('/topic', topicRouter);
routes.use('/progress', progressRouter);
routes.use('/chat', chatRouter);

export default routes;