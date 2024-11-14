import { Router } from 'express';
import { loginUserController, createUserController } from "../controllers/authController.js";
import { loginRateLimiter } from '../middlewares/loginRateLimiter.js';

const authRouter = Router();

authRouter.post('/register', createUserController);
authRouter.post('/login', loginRateLimiter, loginUserController);


export default authRouter;