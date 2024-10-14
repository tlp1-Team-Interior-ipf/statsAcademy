import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, NativeBaseProvider, Spinner, Text, View } from 'native-base';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/userContext';
import { router } from 'expo-router';

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage vaciado con éxito.');
    router.push("Login")
  } catch (error) {
    console.error('Error al vaciar AsyncStorage:', error);
  }
};

const checkAsyncStorage = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

    console.log('userToken:', userToken || 'No hay userToken almacenado.');
    console.log('isLoggedIn:', isLoggedIn || 'No hay estado de sesión (isLoggedIn) almacenado.');

  } catch (error) {
    console.log('Error obteniendo los datos del AsyncStorage:', error);
  }
};

const Explore = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      await checkAsyncStorage(); // Verifica el AsyncStorage al cargar
      setLoading(false); // Cambia el estado de carga
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      router.push('Login'); // Redirigir si no está autenticado
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    return (
      <NativeBaseProvider>
            <Spinner color="blue" />
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
      <View>
        <Button onPress={clearAsyncStorage}><Text>Borrar token</Text></Button>
        <Button onPress={checkAsyncStorage}><Text>Ver AsyncStorage</Text></Button>
      </View>
    </NativeBaseProvider>
  )
};

export default Explore;
