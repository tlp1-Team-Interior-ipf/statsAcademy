import { updateUserAvatar } from '../services/updatedUserProfile.js';

export const updateUserAvatar = async (req, res) => {
    const { id } = req.params;
    let profileImage;

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Imagenes',
            });
            profileImage = result.secure_url;
        } else {
            return res.status(400).json({ message: 'No se proporcionó ninguna imagen.' });
        }

        const updatedUser = await updateUserAvatar(id, profileImage);

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar el avatar:', error);
        return res.status(500).json({ message: 'Error actualizando el avatar', error });
    }
};
