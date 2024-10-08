import { UserModel } from '../models/user.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { findUserById, findUserByEmail } from '../utils/findUser.js';
import { DatabaseError } from '../utils/errorHandler.js';
import { generateToken } from '../utils/jsonwebtoken.js';

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


export const createUser = async (user) => {
    try {
        const existingUser = await UserModel.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new Error('User already exists');
        };

        const hashedPassword = await hashPassword(user.password);
        const newUser = await UserModel.create({ ...user, password: hashedPassword });
        return newUser;

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


export const loginUser = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid Password');
        };
        const token = await generateToken({ id: user.id });
        return token;
    } catch (error) {
        throw new DatabaseError(error);
    };
};