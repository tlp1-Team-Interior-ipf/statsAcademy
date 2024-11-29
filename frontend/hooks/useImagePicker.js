import * as ImagePicker from 'expo-image-picker';
import { uploadCloudinary } from './Upload.Cloudinary';

export const useImagePicker = () => {
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!result.canceled) {
        // const uploadImageUrl = await uploadCloudinary(result.assets[0].uri);
        // return uploadImageUrl;
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      return null;
    }
  };

  return { pickImage };
};
