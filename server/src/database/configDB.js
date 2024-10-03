import { Sequelize } from "sequelize";
import { environments } from "../config/environments.js";


export const sequelize = new Sequelize(
    environments.DB_NAME,
    environments.DB_USER,
    environments.DB_PASSWORD,
    {
        host: environments.DB_HOST,
        port: environments.DB_PORT,
        dialect: environments.DB_DIALECT,
    },
);