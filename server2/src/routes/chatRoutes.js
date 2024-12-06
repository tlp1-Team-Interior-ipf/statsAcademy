import { Router } from 'express';
import { ChatController, ChatHistoryController } from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.post('/:id', ChatController);
chatRouter.get('/history/:id', ChatHistoryController);

export default chatRouter;