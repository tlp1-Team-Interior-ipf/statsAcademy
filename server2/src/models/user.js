import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";

export const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profileImage: { 
        type: DataTypes.STRING,
        allowNull: true,
    },  
},
{
    timestamps: true,
    deletedAt: 'deletedAt',
    tableName: 'User',
},
);