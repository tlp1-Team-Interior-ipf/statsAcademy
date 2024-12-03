import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { environments } from '../config/environments.js';
import { connectDB } from '../database/connection.js';
import routes from '../routes/routes.js';
import { createLogs } from '../utils/createLogs.js';
import fileDirName  from "../utils/fileDirName.js";
const { __dirname } = fileDirName(import.meta);
import 'dotenv/config'

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'], // Permite las solicitudes que necesites
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite los headers que necesites
    credentials: true, // Si necesitas enviar cookies o autenticación
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
    stream: {
        write: (message) => {
            const logPath = path.join(__dirname, 'logs');
            createLogs(message, logPath, 'http');
        }
    }
}))
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