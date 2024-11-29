import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, ScrollView, Image } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import userLoginForm from '../../hooks/userLoginForm';
import { UserContext } from '../../context/userContext';
import { FormInput } from '../../components/Forms/FormInput';
import { Checkbox2 } from '../../components/Checksbox/CheckBox';
import SubmitButton from '../../components/Buttons/LoginButton/LoginButton';
import { StylesLogin } from '../../components/Styles/StylesLogin/StylesLogin';
import { SocialButtons2 } from '../../components/Buttons/SocialButtons/SocialButton';
import { useNavigation } from '@react-navigation/native';

 const LoginScreen = () => {
  const { isLoggedIn } = useContext(UserContext);

  const image1 = require('../../assets/login.png')

  const navigation = useNavigation();

  const {t} = useTranslation();

  const { 
    email, 
    setEmail, 
    pass, 
    setPass, 
    errorMessage, 
    loginUser,
    isChecked,
    setIsChecked,
  } = userLoginForm();

  useEffect(() => {
    const verify = async () => {
      const statusUser = await AsyncStorage.getItem('isLoggedIn')
      console.log('LOGIN: ¿El usuario está logueado?: ', statusUser);
    }
    verify();
  }, [isLoggedIn])

    return (
    // <View>
    //   <Text style={{textAlign: 'center'}}>Welcome to Login Screen!</Text>

    //     <FormInput 
    //       validation={() => true}
    //       placeholder={'email'}
    //       value={email}
    //       setValue={setEmail}
    //       IconComponent={MaterialIcons}
    //       iconName={'email'}
    //       />

    //     <FormInput 
    //       validation={() => true}
    //       placeholder={'password'}
    //       value={pass}
    //       setValue={setPass}
    //       IconComponent={MaterialIcons}
    //       iconName={'password'}
    //       secureTextEntry
    //       />

    //       <ButtonLogin handleLogin={loginUser} errorMessage={errorMessage} />
    //     <ButtonDeleteAccount />
    // </View>

    <>

      <ScrollView>
        <View style={StylesLogin.container}>
          <Image source={image1}  style={{width: 270, height: 350, maxHeight: 'auto', maxWidth: 'auto', top: 45}}/>

          <View style={{backgroundColor:'#fff', width: '113%', borderRadius:15, padding: 55, top: 45, alignItems: 'center'}}>
              
              <Text style={{fontSize: 35, marginVertical: 20, textAlign: 'center'}}>Stats Academy</Text>
              <FormInput
                placeholder={t('Login-email')}
                value={email}
                setValue={setEmail}
                validation={() => true}
                IconComponent={MaterialIcons}
                iconName="email"
              />

              <FormInput
                placeholder={t('Login-password')}
                value={pass}
                setValue={setPass}
                validation={() => true}
                IconComponent={MaterialIcons}
                iconName="password"
                secureTextEntry
              />
              <SubmitButton handleSubmit={loginUser} errorMessage={errorMessage} titleButton={'LOGIN'} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox2 title={t('Login-check')} isChecked={isChecked} setIsChecked={setIsChecked} />
                <Text style={{color:'#00f'}} onPress={() => navigation.navigate("PasswordRecovery")}>{t('Login-help')}</Text>
              </View>
              
              <SocialButtons2 />

          </View>
          
        </View>
      </ScrollView>
    </>
  );
}
 export default LoginScreen
