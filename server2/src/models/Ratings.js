import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const Ratings = sequelize.define('ratings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, 
{
    tableName: 'ratings',
    timestamps: true,
},
);