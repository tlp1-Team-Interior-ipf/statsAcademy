import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'in progress', 'completed'),
        defaultValue: 'pending',
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'tasks',
},
);