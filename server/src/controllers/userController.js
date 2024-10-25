import {getAllUsers,
        getUserById,
        createUser,
        deleteUser,
        loginUser,
        updateUser,
 } from '../services/userServices.js';
import { createJWT } from '../utils/jsonwebtoken.js';
import { validationResult } from 'express-validator';


export const ctrlGetAllUsers = async (_req, res) => {
    try {
        const users = await getAllUsers();
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const ctrlGetUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const ctrlCreateUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().reduce((acc, error) => {
            acc[error.param] = error.msg;
            return acc;
        }, {}) });
    }

    try {
        const user = await createUser(req.body);
        const token = await createJWT({ user: user.id });
        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Bad request' });
    }
};

export const ctrlDeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const ctrlUpdateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await updateUser(userId, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const ctrlLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const token = await createJWT({ user: user.id });
        res.status(200).json({ token, userId: user.id, name: user.username });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Antes de cada controlador que requiera autenticación, utilizamos el middleware de autenticación
export const ctrlGetUserByToken = async (req, res) => {
    try {
        // Aquí podemos acceder al ID del usuario desde req.userId gracias al middleware de autenticación
        const userId = req.userId;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};