import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import { useContext } from 'react';
import { View, Text, Pressable, Switch, Image } from 'react-native';
import { UserContext } from '../../context/userContext';
import { MaterialIcons } from 'react-native-vector-icons'
import { IconEmail, IconProfile, IconSettings } from '../Icons/Icons';
import { useNavigation } from '@react-navigation/native';
import { Temas } from '../../utils/selectTheme';

export const ButtonLogout = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    // await AsyncStorage.clear();
    console.log("vaciado");
    
    await AsyncStorage.setItem('isLoggedIn', 'false');
  };
  
    return (
    <View>
      <Button 
        title='LOGOUT' 
        titleStyle={{color: '#f00'}}
        buttonStyle={{
            borderWidth: 2,
            backgroundColor: 'transparent',
            borderColor: '#f00',
            width: 100,
            borderRadius: 5,
            margin: 'auto',
        }}
        onPress={handleLogout} />
      </View>
  );
}

export const ButtonLogin = ({handleLogin, errorMessage}) => {
    return (
      <>
        <View>
          <Button 
            title='LOGIN' 
            titleStyle={{color: '#36f'}}
            buttonStyle={{
                borderWidth: 2,
                backgroundColor: 'transparent',
                borderColor: '#36f',
                width: 100,
                borderRadius: 5,
                margin: 'auto',
            }}
            onPress={handleLogin} />
          </View>

          {errorMessage && (
            <View style={{ alignItems: 'center', flexDirection: 'row'}}>
              <MaterialIcons name="error" size={24} color="red" />
              <Text style={{ color: 'red', marginLeft: 5 }}>{errorMessage}</Text>
            </View>
          )}
      </>
  );
}

export const ButtonRegister = ({handleRegister, errorMessage}) => {
  return (
    <>
      <View>
        <Button 
          title='REGISTER' 
          titleStyle={{color: '#36f'}}
          buttonStyle={{
              borderWidth: 2,
              backgroundColor: 'transparent',
              borderColor: '#36f',
              width: 100,
              borderRadius: 5,
              margin: 'auto',
          }}
          onPress={handleRegister} />
        </View>

        {errorMessage && (
          <View style={{ alignItems: 'center', flexDirection: 'row'}}>
            <MaterialIcons name="error" size={24} color="red" />
            <Text style={{ color: 'red', marginLeft: 5 }}>{errorMessage}</Text>
          </View>
        )}
    </>
);
}

export const ButtonDeleteAccount = () => {

  const clearOnBoarding = async () => {
    await AsyncStorage.setItem('isOnboardingCompleted', 'false');
  }

    return (
    <View>
      <Button 
        title='DELETE' 
        titleStyle={{color: '#f00'}}
        buttonStyle={{
            borderWidth: 2,
            backgroundColor: 'transparent',
            borderColor: '#f00',
            width: 100,
            borderRadius: 5,
            margin: 'auto',
        }}
        onPress={clearOnBoarding} />
      </View>
  );
}

export const ButtonAccount = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const { TextBackgroundTheme } = Temas();

  return(
    <>
      <Pressable onPress={() => {navigation.navigate('Account'), console.log(user);
      }}>
        {user.profileImage ? <Image source={{uri: user.profileImage}} style={{width: 35, height: 35, borderRadius: 50}} />
      : <IconProfile iconName={'person'} iconSize={30} iconColor={TextBackgroundTheme} />  
      }
      </Pressable>
    </>
  )
}

export const ButtonNotify = () => {
  const navigation = useNavigation();
  const { TextBackgroundTheme } = Temas();

  return(
    <>
      <Pressable onPress={() => navigation.navigate('Notify')}>
        <IconEmail iconName={'email'} iconSize={30} iconColor={TextBackgroundTheme} />
      </Pressable>
    </>
  )
}

export const ButtonSettings = () => {
  const navigation = useNavigation();
  const { TextBackgroundTheme } = Temas();

  return(
    <>
      <Pressable onPress={() => navigation.navigate('Settings')}>
        <IconSettings iconName={'settings-sharp'} iconSize={30} iconColor={TextBackgroundTheme} />
      </Pressable>
    </>
  )
}

export const ButtonSettingOption = () => {
  const navigation = useNavigation();

  return(
    <>
      <Pressable onPress={() => navigation.navigate('Settings')}>
        <IconSettings iconName={'settings-sharp'} iconSize={30} iconColor={'#000'} />
      </Pressable>
    </>
  )
}

export const ButtonTest = () => {
  const { setIsLoggedIn } = useContext(UserContext);

    return (
    <View>
      <Button 
        title='TEST' 
        titleStyle={{color: '#e6f'}}
        buttonStyle={{
            borderWidth: 2,
            backgroundColor: 'transparent',
            borderColor: '#e6f',
            width: 100,
            borderRadius: 5,
            margin: 'auto',
        }}
        />
      </View>
  );
}