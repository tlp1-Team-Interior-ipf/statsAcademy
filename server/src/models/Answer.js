import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";

export const Answer = sequelize.define('answers', {
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
    tableName: 'answers',
},
);