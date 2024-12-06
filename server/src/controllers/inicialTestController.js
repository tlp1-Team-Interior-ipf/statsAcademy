import { initialAssessment } from "../models/initialAssessment.js";

// Controlador para guardar los datos de la evaluación inicial
export const saveEvaluation = async (req, res) => {
  const { note, level, userId } = req.body;
  console.log('Datos recibidos:', req.body); // Verifica que los datos llegan correctamente
  
    // Validar que los datos requeridos estén presentes
    if (!note || !level || !userId) {
      return res.status(400).json({ message: 'Faltan datos en la petición.' });
    }
  
    try {
      // Crear un nuevo registro en la base de datos
      const newEvaluation = await initialAssessment.create({ note, level, userId });
      res.status(201).json({ 
        message: 'Resultados guardados exitosamente.', 
        data: newEvaluation 
      });
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  };