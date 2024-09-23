import express from 'express';
import cors from 'cors';
import { environments } from './src/config/environments.js';
import { router } from './src/routes/routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { connectDB } from './src/database/connection.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = environments.PORT;

// Middleware para manejar rutas
app.use('/', router);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    connectDB();
});