import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const Temas = sequelize.define('Temas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('dictado', 'no dictado'),
        allowNull: false
    },
}, {
    timestamps: false,
});