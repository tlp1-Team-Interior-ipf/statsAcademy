import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const EvaluacionesModel = sequelize.define('Evaluaciones', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('Parcial', 'Inicial'),
        allowNull: false,
    },
},
{
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'Evaluaciones',
},
);