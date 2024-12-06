import { View, Pressable, Image, Text, StyleSheet } from "react-native";
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

  const { BackgroundTheme, inputAccount } = Temas();

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
      {/* <View style={{backgroundColor: '#3366ff50', height: '100%', alignItems: 'center', width: '100%'}}> */}
          <View style={StyleAccount.profileStyle}>
          {user.profileImage ? (
              <Image source={{uri: user.profileImage}} style={StyleAccount.imageProfile} />
          ): <Ionicons name="person" size={60} color={'#fff'} />}
          </View>

          <Pressable
            onPress={handleChangeAvatar} 
            >
            <Text style={StyleAccount.textChangeLan}>{t('Drawer-change-avatar')}</Text>
          </Pressable>

          <View style={{backgroundColor: '#fff', height: '100%', width: '100%', borderRadius: 10, alignItems: 'center', top: 100}}>
            <View style={{backgroundColor: '#fff', height: '100%', borderRadius: 10, alignItems: 'center', top: 50, width: '100%'}}>
              <Text style={[StyleAccount.textSubTitle, {left: -120}]}>{t('My-Account-username')}</Text>
              <View style={[StyleAccount.containerSubText, {backgroundColor: inputAccount}]}>
                <Text style={StyleAccount.contentSubTitle}>{user.name ? user.name : user.username}</Text>
              </View>

              <Text style={[StyleAccount.textSubTitle, {left: -125, }]}>{t('My-Account-email')}</Text>
              <View style={[StyleAccount.containerSubText, {backgroundColor: inputAccount}]}>
                <Text style={StyleAccount.contentSubTitle}>{user.email}</Text>
              </View>

              <Text style={[StyleAccount.textSubTitle, {left: -105}]}>{t('My-Account-password')}</Text>
              <View style={[StyleAccount.containerSubText, {backgroundColor: inputAccount}]}>
                <Text style={StyleAccount.contentSubTitle}>*********</Text>
              </View>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={StyleAccount.buttonDeleteAccount} 
                android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 160}}>
                  <Text style={StyleAccount.textButtonDelete}>
                  {t('My-Account-delete')}
                </Text>
              </Pressable>

            </View>

          </View>
            

      {/* </View> */}
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

const StyleAccount = StyleSheet.create({
  profileStyle: {
    top: 40,
    width: 150, 
    height: 150, 
    borderWidth: 1, 
    borderLeftWidth: 2, 
    borderBottomWidth: 2.7, 
    borderColor: '#fff', 
    borderRadius: 100, 
    margin: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#33aaff40'
  },

  imageProfile: {
    width: 147, 
    height: 147, 
    borderColor: '#fff', 
    borderRadius: 100
  },

  textChangeLan: {
    color: '#fff', 
    textAlign: 'center', 
    fontSize: 15,
    top: 50,
    textDecorationLine: 'underline'
  },

  containerChangeLan: {
    color:'rgba(0, 255, 255, 0.2)', 
    borderless: false, 
    radius: 160,
    top: 80
  },

  textSubTitle: {
    color: '#555', 
    fontWeight: 'bold', 
    fontSize: 17
  },

  contentSubTitle: {
    color: '#555', 
    fontSize: 17, 
    left: 10,
    fontWeight: 'bold'
  },

  containerSubText: {
    borderWidth: 1.5,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.8,
    borderRadius:8, 
    padding: 10, 
    margin: 5, 
    borderColor: '#ccc', 
    width: '90%', 
    height: '7%', 
    justifyContent: 'center',
    // backgroundColor: '#3366ff70',
  },

  buttonDeleteAccount: {
    borderWidth: 2,
    borderLeftWidth: 2.2,
    borderBottomWidth: 2.7,
    borderRadius: 5, 
    padding: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderColor: '#ddd', 
    width: '90%', 
    top: 20, 
    backgroundColor: '#ffffff25' 
  },

  textButtonDelete: {
    color: '#f00', 
    fontWeight: 'bold', 
    fontSize: 17
  }
})

export default AccountScreen;