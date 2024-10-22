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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'Event',
},
);
