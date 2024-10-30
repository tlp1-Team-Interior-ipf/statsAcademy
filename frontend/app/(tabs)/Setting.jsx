import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import  MyStagger  from '@/components/StaggerButtons';

const Setting = () => {

  return (
    <>
    <View style={{height: '100%', backgroundColor: '#10132F'}}>
      <Text style={{textAlign: 'center'}}>Enviaremos un enlace a tu email para para que cambies tu contraseña</Text>
      <TextInput placeholder='Email' style={{borderWidth: 1, borderRadius: 5, padding: 10, margin: 10}} />
      <View style={{alignItems:'center'}}>
        <Button title='ENVIAR'/>
      </View>
    </View>
      <MyStagger />
    </>
  );
};

export default Setting;