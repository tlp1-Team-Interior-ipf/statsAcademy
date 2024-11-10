import { updateUserAvatar } from "../services/cloudinaryService.js";
import { responseHandler } from '../utils/responseHandler.js';

export const updateUserAvatarController = async (req, res) => {
    try {
        const { id } = req.params;
        let profileImage;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'imagenes',
            });
            profileImage = result.secure_url;
        } else {
            responseHandler(res, 400, 'No se ha subido ninguna imagen');
        }
        const updatedUser = await updateUserAvatar(id, profileImage);
        responseHandler(res, 200, updatedUser);
    } catch (error) {
        next(error);
    };
};