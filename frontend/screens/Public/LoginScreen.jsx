import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import { useContext, useEffect } from 'react';
import { ButtonLogin, ButtonDeleteAccount } from '../../components/Buttons/ButtonsRedirects';
import { UserContext } from '../../context/userContext';
import { FormInput } from '../../components/Forms/FormInput';
import { MaterialIcons } from 'react-native-vector-icons';
import userLoginForm from '../../hooks/userLoginForm';

 const LoginScreen = () => {
  const { isLoggedIn } = useContext(UserContext);

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
    <View>
      <Text style={{textAlign: 'center'}}>Welcome to Login Screen!</Text>

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

          <ButtonLogin handleLogin={loginUser} errorMessage={errorMessage} />
        <ButtonDeleteAccount />
    </View>
  );
}
 export default LoginScreen
