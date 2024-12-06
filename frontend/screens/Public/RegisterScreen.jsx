import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';
import React from 'react';
import { FormInput } from '../../components/Forms/FormInput';
import { ButtonRegister } from '../../components/Buttons/ButtonsRedirects';
import { CheckboxRegister } from '../../components/Checkbox/CheckBoxRegister';
import { SocialButtons } from '../../components/Buttons/SocialMediaButtons/SocialButtons';
import { useRegisterForm } from '../../hooks/RegisterForm/useRegisterForm';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validations.js'

const RegisterScreen = () => {
  const {t} = useTranslation();

  const {
    userCreate,
    setUserCreate,
    emailCreate,
    setEmailCreate,
    passCreate,
    setPassCreate,
    isChecked,
    setIsChecked,
    errorMessage,
    handleSubmit,
  } = useRegisterForm();

  return (
    <ScrollView>
      <View style={StylesLogin.container}>
        <Image source={require('../../assets/login.png')} style={{ width: 270, height: 350, maxHeight: 'auto', maxWidth: 'auto', top: 30}} />
        
        <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 55, top: 30, width: '113%', alignItems: 'center'}}>
          <Text style={{fontSize: 35, marginVertical: 20, textAlign: 'center'}}>Stats Academy</Text>

          <FormInput
            placeholder={t('Register-user')}
            value={userCreate}
            setValue={setUserCreate}
            validation={validateUsername}
            errorMessage="El nombre de usuario debe ser mínimo de 4 caracteres"
            IconComponent={Feather}
            iconName="user"
          />

          <FormInput
            placeholder={t('Register-email')}
            value={emailCreate}
            setValue={setEmailCreate}
            validation={validateEmail}
            errorMessage="Formato de email inválido"
            IconComponent={MaterialIcons}
            iconName="email"
          />

          <FormInput
            placeholder={t('Register-password')}
            value={passCreate}
            setValue={setPassCreate}
            secureTextEntry
            validation={validatePassword}
            errorMessage="La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número"
            IconComponent={MaterialIcons}
            iconName="password"
          />

          <ButtonRegister handleRegister={handleSubmit} errorMessage={errorMessage} />
          <CheckboxRegister isChecked={isChecked} setIsChecked={setIsChecked} />
          <SocialButtons />
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

export const StylesLogin = StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: 'center',
      marginTop: 42,
    },
    title: {
      textAlign: 'center',
      fontSize: 30,
      padding: 20
    },
    subtitle: {
      fontSize: 20,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#2231',
      padding: 10,
      margin: 10
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#36f',
    },
    image: {
      width: 200,
      height: '50%'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 20
    },
    button: {
      borderRadius: 20,
      paddingHorizontal:60
    }
  })