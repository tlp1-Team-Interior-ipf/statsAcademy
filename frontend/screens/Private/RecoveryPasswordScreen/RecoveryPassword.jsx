import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button } from '@rneui/themed'
import { Temas } from '../../../utils/selectTheme';

const RecoveryPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const { BackgroundTheme } = Temas();

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
    <View style={[StyleRecoveryPass.containerRecoveryPass, { backgroundColor: BackgroundTheme }]}>
      <Text style={StyleRecoveryPass.titleRecoveryPass}>Enviaremos un enlace a tu email para para que cambies tu contraseña</Text>
      <TextInput 
        placeholder='Email' 
        style={StyleRecoveryPass.inputRecoveryPass} 
        placeholderTextColor={'#ddd'}
        value={email}
        onChangeText={setEmail}
      />
      <View style={{alignItems:'center'}}>
        <Button
          buttonStyle={StyleRecoveryPass.buttonSendRecoveryPass}
          color={'#149'}
        >
          <Text 
            style={StyleRecoveryPass.textButton}
            onPress={enviarCorreo}
          >ENVIAR</Text>
        </Button>
      </View>
    </View>
    </>
  );
};

export default RecoveryPasswordScreen;

const StyleRecoveryPass = StyleSheet.create({
    inputRecoveryPass: {
        borderWidth: 1, 
        borderRadius: 5, 
        padding: 10, 
        margin: 10, 
        borderColor: '#ddd', 
        height: 50, 
        width: '95%', 
        fontSize: 16, 
        color: '#ddd'
    },

    buttonSendRecoveryPass: {
        paddingHorizontal: 15, 
        borderRadius: 5, 
        width: 120, 
        height: 35, 
        margin: 10
    },

    titleRecoveryPass: {
        textAlign: 'center', 
        color: '#ddd', 
        fontSize: 17, 
        width: '90%'
    },

    containerRecoveryPass: {
        height: '100%', 
        paddingTop: 30, 
        alignItems: 'center'
    },

    textButton: {
        color: '#fff', 
        fontSize: 17
    }
})