import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useContext, useEffect } from 'react';
import { ButtonLogin } from '../../components/Buttons/ButtonsRedirects';
import { UserContext } from '../../context/userContext';
import { FormInput } from '../../components/Forms/FormInput';
import { MaterialIcons } from 'react-native-vector-icons';
import userLoginForm from '../../hooks/LoginForm/userLoginForm';
import { CheckboxLogin } from '../../components/Checkbox/CheckBoxLogin';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SocialButtons2 } from '../../components/Buttons/SocialMediaButtons/SocialButtons';

 const LoginScreen = () => {

  const {t} = useTranslation();

  const { isLoggedIn } = useContext(UserContext);

  const image1 = require('../../assets/login.png')

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

  const navigation = useNavigation();

    return (
    <ScrollView>
      <View style={StylesLogin.container}>
        <Image source={image1}  style={{width: 270, height: 350, maxHeight: 'auto', maxWidth: 'auto', top: 45}}/>

        <View style={{backgroundColor:'#fff', width: '113%', borderRadius:15, padding: 55, top: 45, alignItems: 'center'}}>
          
        <Text style={{fontSize: 35, marginVertical: 20, textAlign: 'center'}}>Stats Academy</Text>
          
          <FormInput 
            validation={() => true}
            placeholder={'email'}
            value={email}
            setValue={setEmail}
            IconComponent={MaterialIcons}
            iconName={'email'}
            />

          <FormInput 
            validation={() => true}
            placeholder={'password'}
            value={pass}
            setValue={setPass}
            IconComponent={MaterialIcons}
            iconName={'password'}
            secureTextEntry
            />

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -30}}>
              <CheckboxLogin title={t('Login-check')} isChecked={isChecked} setIsChecked={setIsChecked} />
              <Text style={{color:'#00f'}} onPress={() => navigation.navigate("RecoveryPassword")}>{t('Login-help')}</Text>
            </View>

            <ButtonLogin handleLogin={loginUser} errorMessage={errorMessage} />

            <SocialButtons2 />
        </View>
      </View>
    </ScrollView>
  );
}
 export default LoginScreen


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