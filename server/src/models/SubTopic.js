import { sequelize } from "../database/configDB.js";
import { DataTypes } from "sequelize";


export const SubTopic = sequelize.define('subtopics', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, 
{
    tableName: 'subtopics',
    timestamps: true,
},
);