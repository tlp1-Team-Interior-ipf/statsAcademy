import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userLoginForm = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    

    const loginUser = async () => {

        console.log(email, pass)
        try {
            const response = await fetch('http://192.168.147.123:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                }),
            });
    
            const data = await response.json();
            console.log("Estado de la respuesta:", response.status);
            console.log(data);
    
            if (response.ok) {
                const token = data.token.token; 
                console.log("tokennnn:", token)
                await AsyncStorage.setItem('userToken', token); // guardo el token

                await AsyncStorage.setItem('isLoggedIn', 'true'); // guardo el estado de login
    
                setEmail('');
                setPass('');
                setErrorMessage('');
                router.push('explore');
            } else {
                setErrorMessage(data.message || 'Contraseña o Email incorrecto');
            }
        } catch (error) {
          setErrorMessage('No se pudo conectar con el servidor');
        }
    };

    return {
        email,
        setEmail,
        pass,
        setPass,
        errorMessage,
        setErrorMessage,
        loginUser,
        isChecked,
        setIsChecked
    }
}

export default userLoginForm;