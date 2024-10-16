import { UserModel } from '../models/user.js';

export async function findUserById(userId) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}