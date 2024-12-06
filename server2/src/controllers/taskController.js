import { createTask, deleteTask, getAllTasks, updateTask} from '../services/taskServices.js';
import { responseHandler } from '../utils/responseHandler.js';


export const createTaskController = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const { title, description, date } = req.body;
        const taskData = {
            title,
            description,
            date,
            userId: id,
        };
        const newTask = await createTask(taskData);
        responseHandler(res, 201, newTask);
    } catch (error) {
        next(error);
    };
};


export const getAllTasksController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tasks = await getAllTasks(id);
        if (!tasks) {
            responseHandler(res, 404, 'Tasks not found');
        };
        responseHandler(res, 200, tasks);
    } catch (error) {
        next(error);
    };
};


export const updateTaskController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, date, status } = req.body;
        const taskData = {
            title,
            description,
            date,
            status,
        };
        const updatedTask = await updateTask(id, taskData);
        if (!updatedTask) {
            responseHandler(res, 404, 'Task not found');
        };
        responseHandler(res, 200, updatedTask);
    } catch (error) {
        next(error);
    };
};


export const deleteTaskController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTask = await deleteTask(id);
        if (!deletedTask) {
            responseHandler(res, 404, 'Task not found');
        };
        responseHandler(res, 204, 'Task deleted');
    } catch (error) {
        next(error);
    };
};