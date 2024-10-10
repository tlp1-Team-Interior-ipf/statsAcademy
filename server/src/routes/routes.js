import { Router } from 'express';
import authRouter from './authRoutes';
import userRouter from './userRoutes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', userRouter);

export default routes;