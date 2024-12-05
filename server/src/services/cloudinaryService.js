import { findUserById } from '../utils/findUser.js';
import { DatabaseError } from '../utils/errorHandler.js';


export const updateUserAvatar = async (userId, profileImage) => {
    try {
        const existingUser = await findUserById(userId);
        if(!existingUser) {
            throw new Error('User not found');
        };

        existingUser.profileImage = profileImage;
        await existingUser.save();

        return existingUser;
    } catch (error) {
        DatabaseError(error);
    };
};