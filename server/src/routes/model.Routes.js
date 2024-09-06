import { Router } from 'express';
import { askModel } from '../controllers/modelController.js';

const modelRouter = Router();

modelRouter.post('/ask', askModel);

export default modelRouter;