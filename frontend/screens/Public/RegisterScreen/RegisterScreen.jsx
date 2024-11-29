import React from 'react';
import { useTranslation } from 'react-i18next';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { View, ScrollView, Image, Text } from 'react-native';
import { SocialMedia } from '../../../components/Icons/Icons';
import { FormInput } from '../../../components/Forms/FormInput';
import { useRegisterForm } from '../../../hooks/userRegisterForm';
import { Checkbox1 } from '../../../components/Checksbox/CheckBox';
import SubmitButton from '../../../components/Buttons/LoginButton/LoginButton';
import { StylesLogin } from '../../../components/Styles/StylesLogin/StylesLogin';
import { validateEmail, validatePassword, validateUsername } from '../../../utils/validations'
import { SocialButtons, SocialButtons2 } from '../../../components/Buttons/SocialButtons/SocialButton';

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
        <Image source={require('../../../assets/login.png')} style={{ width: 270, height: 350, maxHeight: 'auto', maxWidth: 'auto', top: 30}} />
        
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

          <SubmitButton handleSubmit={handleSubmit} errorMessage={errorMessage} titleButton={'REGISTER'} />
          <Checkbox1 isChecked={isChecked} setIsChecked={setIsChecked} />
          <SocialButtons />
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
