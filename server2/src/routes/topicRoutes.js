import { Router } from 'express';
import { createTopicController, getAllTopicsController, getCompletedTopicsByUserController, getTopicsController } from '../controllers/topicsController.js';

const topicRouter = Router();

topicRouter.post('/', createTopicController);
topicRouter.get('/', getAllTopicsController);
topicRouter.get('/all-topics-info', getTopicsController);
topicRouter.get('/completed/:userId', getCompletedTopicsByUserController);


export default topicRouter;