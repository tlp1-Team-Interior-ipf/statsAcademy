import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import temaRouter from './temaRoutes.js';
import progresoRouter from './progresoRoutes.js';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', userRouter);
routes.use('/temas', temaRouter);
routes.use('/prgreso', progresoRouter);

export default routes;