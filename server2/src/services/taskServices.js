import { Task } from "../models/tasks.js";
import { findUserById } from "../utils/findUser.js";
import { DatabaseError } from "../utils/errorHandler.js";


export const createTask = async (taskData) => {
    const { title, description, date, userId } = taskData;
    try {
        const existingUser = await findUserById(userId);
        if (!existingUser) {
            throw new Error('User not found');
        };
        const newTask = await Task.create({
            title: title,
            description: description,
            date: date,
            userId: userId,
        });
        return newTask;
    } catch (error) {
        DatabaseError(error);
    };
};

export const getAllTasks = async (userId) => {
    try {
        const tasks = await Task.findAll({
            where: {
                userId: userId,
            },
        });
        if (!tasks) {
            throw new Error('Tasks not found');
        };
        return tasks;
    } catch (error) {
        DatabaseError(error);
    };
};


export const updateTask = async (taskId, taskData) => {
    const { title, description, date, status } = taskData;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.title = title;
        task.description = description;
        task.date = date;
        task.status = status;
        await task.save();
        return task;
    } catch (error) {
        DatabaseError(error);
    };
};


export const deleteTask = async (taskId) => {
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        await task.destroy();
        return task;
    } catch (error) {
        DatabaseError(error);
    };
};