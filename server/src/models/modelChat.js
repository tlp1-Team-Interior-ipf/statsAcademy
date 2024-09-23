import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Chat = sequelize.define('Chat', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });