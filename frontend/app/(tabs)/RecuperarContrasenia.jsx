import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { Button } from '@rneui/themed'
import { router, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const RecuperarContrasenia = () => {
  const [email, setEmail] = useState('');

  const enviarCorreo = async () => {
    try {
      const response = await fetch('http://192.168.0.123:3000/recuperacion/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("datos de envio: ", data) 

      if (response.status === 200) {
        Alert.alert('Correo de recuperación enviado');
        router.push('Login');
      } else {
        Alert.alert(data.message || 'Error al enviar el correo');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error al intentar contactar con el servidor');
    }
  };

  return (
    <>
    <Stack.Screen 
        options={{
            title: '  Olvidé mi contraseña',
            headerShown: true,
            headerBackTitleVisible: true,
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#332288' },
            headerLeft: () => (
                <AntDesign name='arrowleft' onPress={() => router.push('Login')} size={22} color={'#ddd'} style={{ paddingLeft: 10 }} />
            ),
        }} />

    <View style={{height: '100%', backgroundColor: '#332288', paddingTop: 30, alignItems: 'center'}}>
      <Text style={{textAlign: 'center', color: '#ddd', fontSize: 17, width: '90%'}}>Enviaremos un enlace a tu email para para que cambies tu contraseña</Text>
      <TextInput 
        placeholder='Email' 
        style={{borderWidth: 1, borderRadius: 5, padding: 10, margin: 10, borderColor: '#ddd', height: 50, width: '95%', fontSize: 16, color: '#ddd' }} 
        placeholderTextColor={'#ddd'}
        value={email}
        onChangeText={setEmail}
      />
      <View style={{alignItems:'center'}}>
        <Button
          buttonStyle={{ paddingHorizontal: 15, borderRadius: 5, width: 120, height: 35, margin: 10 }}
          color={'#149'}
        >
          <Text 
            style={{color: '#fff', fontSize: 17}}
            onPress={enviarCorreo}
          >ENVIAR</Text>
        </Button>
      </View>
    </View>
    </>
  );
};

export default RecuperarContrasenia;
