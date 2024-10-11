import React, { useState, useContext } from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Stack, router } from 'expo-router';
import { StylesLogin } from '@/components/Styles';
import { UserContext } from '@/context/userContext'
import { validationUser } from '@/components/Validations'
import { ComponentModal } from '@/components/Modal'
import {MyButton} from '@/components/Icons'
import { Button } from '@rneui/base';

export default function Login() {

  const navigation = useNavigation();

  const { users } = useContext(UserContext)
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);



  return (
    <>
      <View style={StylesLogin.centeredView}>
        <Stack.Screen options={{title:"Login"}} />
        <Stack.Screen/>
            <Text style={StylesLogin.title}>Inicia sesión en tu cuenta</Text>
                <TextInput
                    style={StylesLogin.subtitle}
                    placeholder="Username"
                    onChangeText={textoNuevo => setUser(textoNuevo)}
                    value={user}
                />
                <TextInput
                    style={StylesLogin.subtitle}
                    placeholder="Password"
                    onChangeText={contraseña => setPass(contraseña)}
                    value={pass} 
                    secureTextEntry
                />
            <Button 
              buttonStyle={StylesLogin.button}
              title="Login"
              onPress={() => validationUser(user, pass, users, navigation, setModalVisible, setPass, setUser)} 
            />
        <Text>O logeate con una red social</Text>
        <View style={{display:'flex', flexDirection:'row', gap: 5}}>
                    <MyButton iconName="logo-facebook" iconSize={15} />
                    <MyButton iconName="logo-google" iconSize={15} />
                </View>
        <Pressable onPress={() => router.replace("Register")}>
          <Text>No tienes una cuenta? Registrate Ahora</Text>
        </Pressable>
        

      <ComponentModal visible={modalVisible} setVisible={setModalVisible} />
    </View>
    </>
  );
}

