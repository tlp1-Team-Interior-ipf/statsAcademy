import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { environments } from '../config/environments.js';
import { connectDB } from '../database/connection.js';
import routes from '../routes/routes.js';
import { createLogs } from '../utils/createLogs.js';
import fileDirName from "../utils/fileDirName.js";

const { __dirname } = fileDirName(import.meta);

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

export const emitTopicChange = (topic) => {
    console.log('Emitting topic change:', topic);
    io.emit('topicChange', topic);
};

const PORT = environments.PORT;

export const listen = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log("Unable to connect to the database", err);
    };
};
