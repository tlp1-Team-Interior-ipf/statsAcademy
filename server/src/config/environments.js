import dotenv from "dotenv";
dotenv.config();

export const environments = {
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || 'secretkey',
    DB: {
        DB_NAME: process.env.DB_NAME || 'STI',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_DIALECT: process.env.DB_DIALECT || 'mysql',
        DB_PASSWORD: process.env.DB_PASSWORD || '',
        DB_USER: process.env.DB_USER || 'root',
        DB_PORT: process.env.DB_PORT || '3306',
    },
};