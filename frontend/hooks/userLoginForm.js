import { useContext, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from '@/context/userContext';

const userLoginForm = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const { setIsLoggedIn } = useContext(UserContext);
    
    const loginUser = async () => {

        console.log(email, pass)
        try {
            const response = await fetch('http://192.168.31.123:3000/users/login', {
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
            console.log("Estado usuaio:", response);
            console.log(data);
    
            if (response.ok) {
                console.log("respuesta: ", response)
                const token = data.token.token; 
                console.log("tokennnn:", token)
                await AsyncStorage.setItem('userToken', token); // guardo el token

                const userId = data.user.id;

                await AsyncStorage.setItem('userId', userId.toString());

                await AsyncStorage.setItem('isLoggedIn', 'true'); // guardo el estado de login

                setEmail('');
                setPass('');
                setErrorMessage('');
                setIsLoggedIn(true)
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