import { Router } from 'express';
import { createTemaController } from '../controllers/temasController.js';

const temaRouter = Router();

temaRouter.post('/', createTemaController);


export default temaRouter;