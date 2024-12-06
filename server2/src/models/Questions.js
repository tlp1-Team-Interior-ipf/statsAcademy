import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const Questions = sequelize.define('questions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'questions',
},
);