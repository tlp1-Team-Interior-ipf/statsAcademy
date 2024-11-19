import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { MyButton } from '@/components/Icons';
import { router } from 'expo-router';
import { NativeBaseProvider } from 'native-base'
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Temas } from '@/utils/selectTheme';
import { UserContext } from '@/context/userContext';

export const SocialButtons = () => {

  const {t} = useTranslation()
  return(
  <>
    <Text style={{ textAlign: 'center' }}>{t('Register-subtitle-1')}</Text>
    
    <View style={{ flexDirection: 'row', marginVertical: 10, margin: 'auto', gap: 5 }}>
      <MyButton iconName="logo-facebook" iconSize={15} />
      <MyButton iconName="logo-google" iconSize={15} />
    </View>
    <View style={{flexDirection: 'row', margin: 'auto', gap: 5}}>
      <Text>{t('Register-subtitle-2')}</Text>
      <Text style={{color:'#00f'}} onPress={() => router.push("Login")}>{t('Register-subtitle-3')}</Text>
    </View>
  </>
)};

export const SocialButtons2 = () => {
  const {t} = useTranslation();

  return(
  
  <>
    <Text style={{textAlign: 'center'}}>{t('Login-subtitle-1')}</Text>
          
    <View style={{display:'flex', flexDirection:'row', gap: 5, margin: 'auto', marginVertical: 10}}>
      <MyButton iconName="logo-facebook" iconSize={15} />
      <MyButton iconName="logo-google" iconSize={15} />
    </View>

    <View style={{flexDirection: 'row', gap: 5}}>
      <Text >{t('Login-subtitle-2')}</Text>
      <Text style={{color:'#33f', textAlign: 'center'}} onPress={() => router.push("Register")}>{t('Login-subtitle-3')}</Text>
    </View>
  </>
)}


export const ButtonStart = () => {
  const {t} = useTranslation();

  const checkLoginStatusAndRedirect = async () => {
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      router.push('/explore');
    } else {
      router.push('/Login');
    }
  };

  const { 
    ButtonStartTheme
  } = Temas();

  return(
    <>
      <NativeBaseProvider>
          <Button
            buttonStyle={{ paddingHorizontal: 15, borderRadius: 25, width: 120, height: 45, margin: 10}}
            onPress={checkLoginStatusAndRedirect}
            color={ButtonStartTheme}
          >
            <Text style={{color: '#fff', fontSize: 17}}>{t('Button-Start')}</Text>
          </Button>

      </NativeBaseProvider>
    </>
  )
}

export const ButtonList = ({content, action, direction}) => {
  return(
    <Pressable onPress={action} style={{color: '#ddd', textAlign: 'center', fontSize: 15, borderBottomWidth: 2,  borderColor: '#ddd', padding: 10, flexDirection: 'row', justifyContent:'space-between',}} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 170}}>
      <Text style={{color: '#ddd', textAlign: 'center', fontSize: 16}}>{content}</Text>
      <AntDesign name={direction} size={17} color={'#ddd'} />
    </Pressable>
  )
}
