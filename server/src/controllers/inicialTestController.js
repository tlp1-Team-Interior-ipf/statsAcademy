import { EvaInicialModel } from "../models/evaInicial.js";

// Controlador para guardar los datos de la evaluación inicial
export const saveEvaluation = async (req, res) => {
  const { nota, nivel, userId } = req.body;
  console.log('Datos recibidos:', req.body); // Verifica que los datos llegan correctamente
  
    // Validar que los datos requeridos estén presentes
    if (!nota || !nivel || !userId) {
      return res.status(400).json({ message: 'Faltan datos en la petición.' });
    }
  
    try {
      // Crear un nuevo registro en la base de datos
      const newEvaluation = await EvaInicialModel.create({ nota, nivel, userId });
      res.status(201).json({ 
        message: 'Resultados guardados exitosamente.', 
        data: newEvaluation 
      });
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  };