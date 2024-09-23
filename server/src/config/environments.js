import dotenv from "dotenv";
dotenv.config();

export const environments = {
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    DB: {
        DB_NAME: process.env.DB_NAME,
        DB_HOST: process.env.DB_HOST,
        DB_DIALECT: process.env.DB_DIALECT,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_USER: process.env.DB_USER,
        DB_PORT: process.env.DB_PORT,
    },
};