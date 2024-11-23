import { Router } from 'express';
import { createTopicController, getAllTopicsController } from '../controllers/topicsController.js';

const topicRouter = Router();

topicRouter.post('/', createTopicController);
topicRouter.get('/', getAllTopicsController);


export default topicRouter;