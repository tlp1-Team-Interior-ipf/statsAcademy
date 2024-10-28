import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const SubTemas = sequelize.define('SubTemas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, 
{
    timestamps: false,
},
);