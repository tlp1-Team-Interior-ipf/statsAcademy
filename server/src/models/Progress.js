import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const Progress = sequelize.define('Progress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    progress: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, 
{
    tableName: 'progress',
    timestamps: true,
},
);