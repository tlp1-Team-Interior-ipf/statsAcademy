import { findUserById } from '../utils/findUsersById.js'

export const updateUserAvatarService = async (userId, profileImage) => {
    try {
        const existingUser = await findUserById(userId);

        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }

        existingUser.profileImage = profileImage;
        await existingUser.save();

        return existingUser;
    } catch (error) {
        throw error;
    }
};
