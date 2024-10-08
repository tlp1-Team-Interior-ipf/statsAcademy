import { 
    createUser,
    deleteUser,
    getUserById,
    loginUser,
    updateUser,
    getAllUsers,
} from '../services/userServices.js';
import { responseHandler } from '../utils/responseHandler.js';

export const createUserController = async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        responseHandler(res, 201, user);
    } catch (error) {
        next(error);
    };
};

export const deleteUserController = async (req, res, next) => {
    try {
        await deleteUser(req.params.id);
        responseHandler(res, 204, null);
    } catch (error) {
        next(error);
    };
};


export const getUserByIdController = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        responseHandler(res, 200, user);
    } catch (error) {
        next(error);
    };
};


export const updateUserController = async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        responseHandler(res, 200, user);
    } catch (error) {
        next(error);
    };
};


export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        responseHandler(res, 200, users);
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