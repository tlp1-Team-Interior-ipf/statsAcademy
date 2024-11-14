import {
    deleteUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
 } from '../controllers/userController.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getAllUsersController);
userRouter.get('/:id', getUserByIdController);
userRouter.put('/:id', updateUserController);
userRouter.delete('/:id', deleteUserController);

export default userRouter;