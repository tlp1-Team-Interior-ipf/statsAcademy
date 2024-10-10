import { loginUser, createUser } from "../services/authServices.js";
import { responseHandler } from '../utils/responseHandler.js';

export const createUserController = async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        responseHandler(res, 201, user);
    } catch (error) {
        next(error);
    };
};


export const loginUserController = async (req, res, next) => {
    try {
        const user = await loginUser(req.body);
        responseHandler(res, 200, user);
    } catch (error) {
        next(error);
    };
};