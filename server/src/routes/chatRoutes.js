import { Router } from 'express';
import { ChatController } from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.post('/:id', ChatController);

export default chatRouter;