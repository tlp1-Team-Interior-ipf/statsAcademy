import { Router } from 'express';
import { createTopicController, getAllTopicsController, getTopicsController } from '../controllers/topicsController.js';

const topicRouter = Router();

topicRouter.post('/', createTopicController);
topicRouter.get('/', getAllTopicsController);
topicRouter.get('/all-topics-info', getTopicsController);


export default topicRouter;