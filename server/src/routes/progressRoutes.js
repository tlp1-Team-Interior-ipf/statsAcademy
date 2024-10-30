import { Router } from 'express';
import { calculateProgressController, getProgressController } from '../controllers/progressController.js';

const progressRouter = Router();

progressRouter.get('/:id', getProgressController);
progressRouter.post('/calculate/:id', calculateProgressController);

export default progressRouter;