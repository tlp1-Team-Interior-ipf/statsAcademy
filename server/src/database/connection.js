import { sequelize } from "./configDB.js";
import relations from "../models/relations.js";

export const connectDB = async () => {
    relations();
    try {
        await sequelize.sync({ alter: true });
        console.log("Connected to the database");

    } catch (err) {
        console.log("Unable to connect to the database", err);
    }
};