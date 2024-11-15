import { Sequelize } from "sequelize";
import { environments } from "../config/environments.js";
import fileDirName from '../utils/fileDirName.js';
import fs from "fs";
import path from "path";

const { __dirname } = fileDirName(import.meta);

const logsDir = path.join(__dirname, 'logs');
const logFile = path.join(logsDir, 'database.log');

// Crea el directorio 'logs' si no existe
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true }); 
  }
  
  // Crea el archivo 'database.log' si no existe
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, '', 'utf-8');
  }
  
  const logStream = fs.createWriteStream(logFile, { flags: 'a' });

export const sequelize = new Sequelize(
    environments.DB_NAME,
    environments.DB_USER,
    environments.DB_PASSWORD,
    {
        host: environments.DB_HOST,
        port: environments.DB_PORT,
        dialect: environments.DB_DIALECT,
        logging: (msg) => logStream.write(msg + '\n'),
    },
);