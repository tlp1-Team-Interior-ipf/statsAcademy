import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './src/routes/routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { connectDB } from './src/config/db.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Middleware para manejar rutas
app.use('/', router);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    connectDB();
});