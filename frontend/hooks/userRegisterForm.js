// useRegisterForm.js
import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useRegisterForm = () => {
  const [userCreate, setUserCreate] = useState('');
  const [emailCreate, setEmailCreate] = useState('');
  const [passCreate, setPassCreate] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!isChecked) {
      setErrorMessage('Debes aceptar los términos y condiciones');
      return;
    } else {
      setErrorMessage('')
    }
    if (!userCreate || !emailCreate || !passCreate) {
      setErrorMessage('Los campos no pueden estar vacíos');
      return;
    } else {
      setErrorMessage('')
    }

    try {
      const response = await fetch('http://192.168.129.123:3000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userCreate,
          email: emailCreate,
          password: passCreate,
        }),
      });

      const data = await response.json();
      console.log("response data: ", data.error)
      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token.token);
        setUserCreate('');
        setEmailCreate('');
        setPassCreate('');
        router.push('Login');
      } else {
        Alert.alert('Error de registro', data.error || 'Hubo un problema con el registro');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return {
    userCreate,
    setUserCreate,
    emailCreate,
    setEmailCreate,
    passCreate,
    setPassCreate,
    isChecked,
    setIsChecked,
    errorMessage,
    handleSubmit,
  };
};
