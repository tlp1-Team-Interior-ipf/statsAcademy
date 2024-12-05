import fs from 'fs';
import path from 'path';

export const createLogs = async (message, initialPath, nameFolder) => {
  try {
    const logDirectory = path.join(initialPath, nameFolder);
    const date = new Date();
    const logFileName = date.toISOString().slice(0, 10) + '.log';
    const logFilePath = path.join(logDirectory, logFileName);

    // Verifica si el directorio existe, si no, lo crea
    if (!fs.existsSync(logDirectory)) {
      await fs.promises.mkdir(logDirectory, { recursive: true });
    }

    // Verifica si el archivo de log existe, si no, lo crea
    if (!fs.existsSync(logFilePath)) {
      await fs.promises.writeFile(logFilePath, '');
    }

    // Añade el mensaje al archivo de log con un separador de línea
    const logMessage = `[${date.toISOString()}] ${message}\n`;
    await fs.promises.appendFile(logFilePath, logMessage);
    
  } catch (error) {
    console.error('Error writing log:', error);
  }
};