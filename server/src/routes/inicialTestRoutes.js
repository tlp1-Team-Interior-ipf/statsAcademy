import { Router } from 'express';
import { saveEvaluation } from '../controllers/inicialTestController.js';

const inicialTestRoutes = Router();

// Ruta para guardar los datos de la evaluación inicial
inicialTestRoutes.post('/inicial-test', saveEvaluation);

export default inicialTestRoutes;
