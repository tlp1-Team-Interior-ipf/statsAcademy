import { sequelize } from '../database/configDB.js';
import { DataTypes } from 'sequelize';


export const Program = sequelize.define('program', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    tableName: 'program',
    timestamps: false,
});