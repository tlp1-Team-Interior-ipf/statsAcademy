import { Router } from 'express';
import { calcularProgresoController, getProgresoController } from '../controllers/progresoController.js';

const progresoRouter = Router();

progresoRouter.get('/:id', getProgresoController);
progresoRouter.post('/calcular/:id', calcularProgresoController);

export default progresoRouter;