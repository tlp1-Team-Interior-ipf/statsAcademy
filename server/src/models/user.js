import { sequelize } from "../config/db.js";
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
    timestamps: true, // Esta opción agrega automáticamente las columnas createdAt y updatedAt
    deletedAt: 'deletedAt', // Si quieres usar soft delete, puedes configurar la columna deletedAt aquí
    tableName: 'User',
},
);