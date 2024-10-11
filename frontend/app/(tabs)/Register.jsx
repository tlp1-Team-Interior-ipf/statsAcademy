import React, { useState, useContext } from 'react';
import { TextInput, View, Text, Pressable, Image, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { StylesLogin, StylesRegister } from '@/components/Styles';
import { UserContext } from '@/context/userContext'
import { validationUser } from '@/components/Validations'
import { ComponentModal } from '@/components/Modal'
import {MyButton} from '@/components/Icons'
import { Button, CheckBox } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage'

 const Register = () => {

    const image1 = require('@/img/login.png')

    const {users, setUsers} = useContext(UserContext)
    const [userCreate, setUserCreate] = useState('');
    const [emailCreate, setEmailCreate] = useState('');
    const [passCreate, setPassCreate] = useState('');
    const [userError, setUserError] = useState('');
    const [passError, setPassError] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const createUser = async () => {
        // Validaciones básicas
        if (!userCreate || !emailCreate || !passCreate) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }
    
        try {
            const response = await fetch('http://192.168.147.123:3000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userCreate,
                    email: emailCreate,
                    password: passCreate,
                }),
            });
    
            const data = await response.json();
            console.log("Estado de la respuesta:", response.status);
            console.log(data);
    
            if (response.ok) {
                const token = data.token; // Asegúrate de acceder correctamente al token
                await AsyncStorage.setItem('userToken', token);
    
                setUserCreate('');
                setEmailCreate('');
                setPassCreate('');
                router.push('Login');
            } else {
                // Manejo de errores de validación
                if (data.errors) {
                    setUserError(data.errors.username ? data.errors.username.msg : ''); // Aquí asumo que el error es un objeto con la propiedad `msg`
                    setEmailError(data.errors.email ? data.errors.email.msg : '');
                    setPassError(data.errors.password ? data.errors.password.msg : '');
                } else {
                    Alert.alert('Error de registro', data.message || 'Hubo un problema con el registro');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };
    
    return(
        <>
            <View style={StylesLogin.container}>
                <Stack.Screen options={ { headerShown:false } } />
                <Image source={image1} style={{width: 270, height: 350, maxHeight: 'auto', maxWidth: 'auto', top: 20}} />
                
                <View style={{backgroundColor:'#fff', width: '107%', borderRadius:15, padding: 50, top: 20, paddingVertical:15}}>
                <Text style={StylesLogin.title}>Stats Academy</Text>
                <View >
                    <TextInput
                        style={StylesRegister.input}
                        placeholder="Usuario"
                        onChangeText={textoNuevo => {setUserCreate(textoNuevo)}}
                        value={userCreate}
                    />
                    {userError ? <Text style={{color: 'red'}}>{userError}</Text> : null}
                    <TextInput
                        style={StylesRegister.input}
                        placeholder="Email"
                        onChangeText={emailNuevo => setEmailCreate(emailNuevo)}
                        value={emailCreate}
                    />
                    {userError ? <Text style={{color: 'red'}}>{emailError}</Text> : null}
                    <TextInput
                        style={StylesRegister.input}
                        placeholder="Contraseña"
                        onChangeText={contraseña => setPassCreate(contraseña)}
                        value={passCreate} 
                        secureTextEntry
                    />
                    {passError ? <Text style={{color: 'red'}}>{passError}</Text> : null}
                    
                </View>

                <Button 
                    buttonStyle={{borderRadius:10, margin: 'auto', width:240}}
                    title="REGISTRO"
                    onPress={createUser} 
                />
                    <CheckBox title={'Terminos y Condiciones'} />

                <Text style={{textAlign:'center'}}>O registrarte con una red social</Text>
                <View style={{display:'flex', flexDirection:'row', gap: 5, marginVertical: 10, margin: 'auto'}}>
                    <MyButton iconName="logo-facebook" iconSize={15} />
                    <MyButton iconName="logo-google" iconSize={15} />
                </View>

                <Pressable onPress={() => router.push("Login")}>
                    <Text style={{textAlign:'center'}}>Ya tienes una cuenta? <Text style={{color:'#22f'}}>Ingresa aquí</Text></Text>
                </Pressable>
                </View>
            </View>
        </>
    )
}

export default Register

