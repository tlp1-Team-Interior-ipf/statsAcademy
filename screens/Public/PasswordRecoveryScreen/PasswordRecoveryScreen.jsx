import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { Button } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';
import { Temas } from '../../../utils/selectTheme';

const PasswordRecoveryScreen = () => {
  const [email, setEmail] = useState('');

  const { BackgroundTheme } = Temas();
  
  const navigation = useNavigation();

  const enviarCorreo = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/recuperacion/request-password-reset`, {
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
        navigation.navigate('Login');
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
        <View style={{height: '100%', backgroundColor: BackgroundTheme, paddingTop: 30, alignItems: 'center'}}>
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
                <Text style={{color: '#fff', fontSize: 17}} onPress={enviarCorreo}>ENVIAR</Text>
                </Button>
            </View>
        </View>
    </>
  );
};

export default PasswordRecoveryScreen;
