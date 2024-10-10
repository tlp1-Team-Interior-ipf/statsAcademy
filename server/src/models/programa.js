import { sequelize } from '../database/configDB.js';
import { DataTypes } from 'sequelize';


export const Programa = sequelize.define('programa', {
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
}, {
    timestamps: false,
});