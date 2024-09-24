import { sequelize } from "./configDB.js";
import relations from "../models/relations.js";

export const connectDB = async () => {
    try {
        await sequelize.sync();
        console.log("Connected to the database");

        relations();
    } catch (err) {
        console.log("Unable to connect to the database", err);
    }
};