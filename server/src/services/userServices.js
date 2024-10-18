import { UserModel } from '../models/user.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { findUserById } from '../utils/findUsersById.js';

export async function getAllUsers() {
    try {
        const users = await UserModel.findAll();

        if (!users || users.length === 0) {
            throw new Error('No users found');
        }

        return users;

    } catch (error) {
        throw error;
    }
};

export async function createUser (user) {
    try {
        const existingEmail = await UserModel.findOne({ where: { email: user.email } });
        if (existingEmail) {
            throw new Error('A user with this email already exists');
        }

        const existingUser = await UserModel.findOne({ where: { username: user.username } });

        if (existingUser) {
            throw new Error('A user with this username already exists');
        }

        const hashedPassword = await hashPassword(user.password);
        const newUser = await UserModel.create({ ...user, password: hashedPassword });
        return newUser;

    } catch (error) {
        throw error;
    }
};

export async function getUserById (userId) {
    try {
        const user = await findUserById(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

export async function deleteUser (userId) {
    try {
        const user = await findUserById(userId);

        await user.destroy();
        return { message: 'User deleted successfully' };

    } catch (error) {
        throw error;
    }
};

export async function updateUser (userId, updatedUserData) {
    try {
        const existingUser = await findUserById(userId);

        const updatedUser = await existingUser.update(updatedUserData);
        return updatedUser;

    } catch (error) {
        throw error;
    }
};

export async function loginUser(email, password) {
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        return user;
    } catch (error) {
        throw error;
    }
};