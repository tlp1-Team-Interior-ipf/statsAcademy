import { View, Pressable, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {useTranslation} from 'react-i18next';
import { Temas } from "../../../utils/selectTheme";
import { UserContext } from "../../../context/userContext";
import DeleteAccountModal from "../../../components/Modals/DeleteAccountModal/DeleteAccount";
import { useImagePicker } from "../../../hooks/useImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadCloudinary } from "../../../hooks/Upload.Cloudinary";

const AccountScreen = () => {
  const {t} = useTranslation();

  const { user, setIsLoggedIn, updateUserProfile } = useContext(UserContext);
  
  const [modalVisible, setModalVisible] = useState(false);

  const { BackgroundTheme } = Temas();

  const { pickImage } = useImagePicker();

  const handleUpload = async (imageUri) => {
    console.log("url", imageUrl);
    
    const imageUrl = await uploadCloudinary(imageUri, user);
    console.log('Imagen subida con éxito:', imageUrl);
    return imageUrl
  };

  const handleChangeAvatar = async () => {
    try {
      const imageUri = await pickImage(); // Obtén la URI de la imagen seleccionada
      console.log("uri", imageUri);
      
      if (!imageUri) return; // Si no se selecciona nada, salimos
  
      const imageUrl = await uploadCloudinary(imageUri, user); // Sube la imagen
      console.log("url:", imageUrl);
      
      if (!imageUrl) throw new Error('No se pudo subir la imagen a Cloudinary.');
  
      console.log('Imagen subida con éxito:', imageUrl);
  
      // Guarda la imagen en AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      const profileImageKey = `profileImage_${userId}`;
      await AsyncStorage.setItem(profileImageKey, imageUrl);
  
      // Actualiza el contexto de usuario
      updateUserProfile(imageUrl);
    } catch (error) {
      console.error('Error al cambiar avatar:', error);
    }
  };

  return(
    <>
      <View style={{ backgroundColor: BackgroundTheme, height: '100%', alignItems: 'center' }}>
      
        <View style={{width: 100, height: 100, borderWidth: 1, borderColor: '#fff', borderRadius: 50, margin: 10, alignItems: 'center', justifyContent: 'center'}}>
        {user.profileImage ? (
            <Image source={{uri: user.profileImage}} style={{width: 100, height: 100, borderWidth: 1, borderColor: '#ddd', borderRadius: 50}} />
        ): <Ionicons name="person" size={60} color={'#ddd'} />}
        </View>

        <Pressable
          onPress={handleChangeAvatar} 
          android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 160}}>
          <Text style={{color: '#fff', textAlign: 'center', fontSize: 15}}>Cambiar avatar</Text>
        </Pressable>
          
        <Text style={{ color: '#ddd', fontWeight: 'bold', left: -120, fontSize: 17}}>{t('My-Account-username')}</Text>
        <View style={{ borderWidth: 1, borderRadius:5, padding: 10, margin: 5, borderColor: '#ddd', width: '90%', height: '7%', justifyContent: 'center' }}>
          <Text style={{color: '#ddd', fontSize: 17, left: 10}}>{user.name ? user.name : user.username}</Text>
        </View>

        <Text style={{ color: '#ddd', fontWeight: 'bold', left: -125, fontSize: 17}}>{t('My-Account-email')}</Text>
        <View style={{ borderWidth: 1, borderRadius:5, padding: 10, margin: 5, borderColor: '#ddd', width: '90%', height: '7%', justifyContent: 'center' }}>
          <Text style={{color: '#ddd', fontSize: 17, left: 10}}>{user.email}</Text>
        </View>

        <Text style={{ color: '#ddd', fontWeight: 'bold', left: -105, fontSize: 17}}>{t('My-Account-password')}</Text>
        <View style={{ borderWidth: 1, borderRadius:5, padding: 10, margin: 5, borderColor: '#ddd', width: '90%', height: '7%', justifyContent: 'center' }}>
          <Text style={{color: '#ddd', fontSize: 17, left: 10}}>*********</Text>
        </View>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={{ borderWidth: 2, borderRadius: 5, padding: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#ddd', width: '90%', top: 20, backgroundColor: '#ffffff25' }} 
          android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 160}}>
            <Text style={{ color: '#f00', fontWeight: 'bold', fontSize: 17 }}>
            {t('My-Account-delete')}
          </Text>
        </Pressable>
      </View>

      <DeleteAccountModal
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  )
}

export default AccountScreen;