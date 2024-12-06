import { loginUser, createUser } from "../services/authServices.js";
import { responseHandler } from '../utils/responseHandler.js';

export const createUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await createUser({ username, email, password });
        responseHandler(res, 201, user);
    } catch (error) {
        next(error);
    };
};


export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        responseHandler(res, 200, user);
    } catch (error) {
        next(error);
    };
};