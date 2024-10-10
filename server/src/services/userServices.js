import { UserModel } from '../models/user.js';
import { findUserById } from '../utils/findUser.js';
import { DatabaseError } from '../utils/errorHandler.js';

export const getAllUsers = async () => {
    try {
         const users = await UserModel.findAll();

         if (!users || users.length === 0) {
            throw new Error('No users found');
         };

            return users;
    } catch (error) {
        throw new DatabaseError(error);
    };
};


export const getUserById = async (id) => {
    try {
        const user = await findUserById(id);
        return user;
    } catch (error) {
        throw new DatabaseError(error);
    };
};


export const updateUser = async (id, user) => {
    try {
        const existingUser =  await findUserById(id);
        const updatedUser = await existingUser.update(user);
        return updatedUser;
    } catch (error) {
        throw new DatabaseError(error);
    };
};


export const deleteUser = async (id) => {
    try {
        const user = await findUserById(id);
        await user.destroy();
        return user;
    } catch (error) {
        throw new DatabaseError(error);
    };
};