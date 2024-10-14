import React from 'react';
import { View, Text } from 'react-native';
import { MyButton } from '@/components/Icons';
import { router } from 'expo-router';

export const SocialButtons = () => (
  <>
    <Text style={{ textAlign: 'center' }}>O regístrate con una red social</Text>
    
    <View style={{ flexDirection: 'row', marginVertical: 10, margin: 'auto', gap: 5 }}>
      <MyButton iconName="logo-facebook" iconSize={15} />
      <MyButton iconName="logo-google" iconSize={15} />
    </View>
    <View style={{flexDirection: 'row', margin: 'auto'}}>
      <Text>¿Ya tienes una cuenta? </Text>
      <Text style={{color:'#00f'}} onPress={() => router.push("Login")}>¡Inicia sesión!</Text>
    </View>
  </>
);

export const SocialButtons2 = () => (
  <>
    <Text style={{textAlign: 'center'}}>O logeate con una red social</Text>
          
    <View style={{display:'flex', flexDirection:'row', gap: 5, margin: 'auto', marginVertical: 10}}>
      <MyButton iconName="logo-facebook" iconSize={15} />
      <MyButton iconName="logo-google" iconSize={15} />
    </View>

    <View style={{flexDirection: 'row'}}>
      <Text >¿No tienes una cuenta? </Text>
      <Text style={{color:'#33f', textAlign: 'center'}} onPress={() => router.push("Register")}>¡Registrate aquí!</Text>
    </View>
  </>
)

