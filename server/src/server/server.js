import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { environments } from '../config/environments.js';
import { connectDB } from '../database/connection.js';
import routes from '../routes/routes.js';
import { createLogs } from '../utils/createLogs.js';
import fileDirName from "../utils/fileDirName.js";

const { __dirname } = fileDirName(import.meta);

const app = express();

// Configuración de CORS para permitir solicitudes desde todos los orígenes
app.use(cors({
    origin: '*',  // Permite solicitudes de todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Encabezados permitidos
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan('combined', {
    stream: {
        write: (message) => {
            const logPath = path.join(__dirname, 'logs');
            createLogs(message, logPath, 'http');
        }
    }
}));

// Rutas de la API
app.use(routes);

const PORT = environments.PORT;

export const listen = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log("Unable to connect to the database", err);
    };
};
