import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import temaRouter from './temaRoutes.js';
import progresoRouter from './progresoRoutes.js';
import chatRouter from './chatRoutes.js';
import inicialTestRoutes from './inicialTestRoutes.js';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', userRouter);
routes.use('/temas', temaRouter);
routes.use('/progreso', progresoRouter);
routes.use('/chat', chatRouter);
routes.use('/', inicialTestRoutes);

export default routes;