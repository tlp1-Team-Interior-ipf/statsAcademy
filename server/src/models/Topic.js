import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const Topic = sequelize.define('topics', {
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
    status: {
        type: DataTypes.ENUM('dictated', 'not dictated'),
        allowNull: false
    },
}, {
    tableName: 'topics',
    timestamps: true,
});