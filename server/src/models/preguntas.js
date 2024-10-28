import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const PreguntasModel = sequelize.define('Preguntas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pregunta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'Preguntas',
},
);