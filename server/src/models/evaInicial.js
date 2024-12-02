import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const EvaInicialModel = sequelize.define('EvaInicial', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'EvaInicial',
},
);