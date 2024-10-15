import { Button, Text, View } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { UserContext } from '@/context/userContext';
import { useContext } from 'react';

const ActionButtons = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage vaciado con éxito.');
      setIsLoggedIn(false);
      router.push("/");
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

  return (
    <View style={{ margin: 'auto', gap: 10 }}>
      <Button onPress={clearAsyncStorage}><Text style={{color:'#fff'}}>CERRAR SESIÓN</Text></Button>
      <Button onPress={checkAsyncStorage}><Text style={{color:'#fff'}}>Ver AsyncStorage</Text></Button>
    </View>
  );
};

export default ActionButtons;
