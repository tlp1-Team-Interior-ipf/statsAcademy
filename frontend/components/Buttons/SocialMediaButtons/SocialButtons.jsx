import React from 'react';
import { View, Text } from 'react-native';
import { MyButton } from '../../Icons/Icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export const SocialButtons = () => {
    const {t} = useTranslation()

    const navigation = useNavigation();

  return(
  <>
    <Text style={{ textAlign: 'center', marginTop: 10 }}>{t('Register-subtitle-1')}</Text>
    
    <View style={{ flexDirection: 'row', marginVertical: 10, margin: 'auto', gap: 5 }}>
      <MyButton iconName="logo-facebook" iconSize={15} />
      <MyButton iconName="logo-google" iconSize={15} />
    </View>
    <View style={{flexDirection: 'row', margin: 'auto', gap: 5}}>
      <Text>{t('Register-subtitle-2')}</Text>
      <Text style={{color:'#00f'}} onPress={() => navigation.navigate("Login")}>{t('Register-subtitle-3')}</Text>
    </View>
  </>
)};

export const SocialButtons2 = () => {
  const {t} = useTranslation();

  const navigation = useNavigation();

  return(
  
  <>
    <Text style={{textAlign: 'center', marginTop: 10}}>{t('Login-subtitle-1')}</Text>
          
    <View style={{display:'flex', flexDirection:'row', gap: 5, margin: 'auto', marginVertical: 10}}>
      <MyButton iconName="logo-facebook" iconSize={15} />
      <MyButton iconName="logo-google" iconSize={15} />
    </View>

    <View style={{flexDirection: 'row', gap: 5}}>
      <Text >{t('Login-subtitle-2')}</Text>
      <Text style={{color:'#33f', textAlign: 'center'}} onPress={() => navigation.navigate("Register")}>{t('Login-subtitle-3')}</Text>
    </View>
  </>
)}


