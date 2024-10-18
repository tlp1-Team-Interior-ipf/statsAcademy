import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const EventModel = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    event: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
},
{
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'Event',
},
);