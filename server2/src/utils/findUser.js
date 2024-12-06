import { UserModel } from "../models/user.js";

export async function findUserById(userId) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    };
    return user;
};


export const findUserByEmail = async (email) => {
    const user = await UserModel.findOne({ where: { email } });
    
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};