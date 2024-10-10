import { 
    deleteUser,
    getUserById,
    updateUser,
    getAllUsers,
} from '../services/userServices.js';
import { responseHandler } from '../utils/responseHandler.js';


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