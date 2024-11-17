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
      const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userCreate,
          email: emailCreate,
          password: passCreate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error de registro', data.error || 'Hubo un problema con el registro');
      } 

        setUserCreate('');
        setEmailCreate('');
        setPassCreate('');
        router.push('Login');
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
