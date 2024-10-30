import { Router } from 'express';
import { createTopicController } from '../controllers/topicsController.js';

const topicRouter = Router();

topicRouter.post('/', createTopicController);


export default topicRouter;