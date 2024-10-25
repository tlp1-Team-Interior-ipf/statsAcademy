import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";

export const RespuestasModel = sequelize.define('Respuestas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    respuesta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'Respuestas',
},
);