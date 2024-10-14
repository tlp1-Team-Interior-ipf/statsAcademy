import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const Progreso = sequelize.define('Progreso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    progreso: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, 
{
    timestamps: false,
},
);