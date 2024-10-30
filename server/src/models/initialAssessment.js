import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const initialAssessment = sequelize.define('initialAssessment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'initialAssessment',
},
);