import dotenv from "dotenv";
dotenv.config();

export const environments = {
    PORT: process.env.PORT || 3000,
    DB: {
        DB_NAME: process.env.DB_NAME || 'statsAcademy',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_DIALECT: process.env.DB_DIALECT || 'postgres',
        DB_PASSWORD: process.env.DB_PASSWORD || 'root',
        DB_USER: process.env.DB_USER || 'postgres',
        DB_PORT: process.env.DB_PORT || '5432',
    },
};