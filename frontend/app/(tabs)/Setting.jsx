import React, { useEffect, useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserContext } from '@/context/userContext';
import { router } from 'expo-router';

const Setting = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [isMounted, setIsMounted] = useState(false); // Estado para verificar si el componente está montado
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    setIsMounted(true); // Marcamos el componente como montado

    // Solo navegamos si el componente está montado y el usuario no está autenticado
    if (!isLoggedIn && isMounted) {
      router.push('Login'); // Redirigir si no está autenticado
    }

    // Cleanup function para actualizar el estado
    return () => {
      setIsMounted(false);
    };
  }, [isLoggedIn, isMounted]);

  if (!loading) {
    return (
      <Text>Cargando...</Text>
    );
  }

  return (
    <View>
      <Text>Enviaremos un enlace a tu email para para que cambies tu contraseña</Text>
      <TextInput placeholder='Email' style={{borderWidth: 1, borderRadius: 5, padding: 10, margin: 10}} />
      <View style={{margin: 'auto'}}>
        <Button title='ENVIAR'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Setting;
