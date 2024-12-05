import { Router } from 'express';
import { createTopicController, getAllTopicsController, getTopicsController, getNextTopicController } from '../controllers/topicsController.js';

const topicRouter = Router();

topicRouter.post('/', createTopicController);
topicRouter.get('/', getAllTopicsController);
topicRouter.get('/all-topics-info', getTopicsController);
topicRouter.get('/current', getNextTopicController);


export default topicRouter;