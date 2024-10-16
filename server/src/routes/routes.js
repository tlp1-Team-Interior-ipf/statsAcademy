import { Router } from 'express';
import userRouter from './user.routes.js';
import modelRouter from './model.Routes.js';

const router = Router();

router.use('/users', userRouter);
router.use(modelRouter);

export { router };