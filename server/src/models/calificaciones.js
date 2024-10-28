import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const Calificaciones = sequelize.define('Calificaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, 
{
    timestamps: false,
},
);