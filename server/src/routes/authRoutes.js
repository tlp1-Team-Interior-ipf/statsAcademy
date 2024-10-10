import { Router } from 'express';
import { loginUserController, createUserController } from "../controllers/authController.js";
import { loginRateLimiter } from '../middlewares/loginRateLimiter.js';

const authRouter = Router();

authRouter.post('/register', loginRateLimiter, createUserController);
authRouter.post('/login', loginUserController);


export default authRouter;