import { useContext, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from '@/context/userContext';

const userLoginForm = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const { setIsLoggedIn, setUser } = useContext(UserContext);
    
    const loginUser = async () => {
        console.log(email, pass)
        try {
            const response = await fetch('http://192.168.0.123:4000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                }),
            });
            console.log('laresponse:', response.ok)

            console.log("Usuario logueado:");
            
            if (response.ok) {

                const data = await response.json();
                console.log("data:", data)

                const token = data.data.token; 
                const userId = data.data.id;
                const userName = data.data.username;
                const userEmail = data.data.email;
                console.log("uy encontré un token: ", token)
                console.log("uy encontré un nombre de usuario: ", userName)
                console.log("uy encontré un identificador de usuario: ", userId)
                console.log("uy encontré un email de usuario: ", userEmail)

                const profileImageKey = `profileImage_${userId}`;
                console.log("uy encontré una clave unica: ", profileImageKey)
                
                const profileImage = await AsyncStorage.getItem(profileImageKey);
                console.log("uy encontré un avatar: ", profileImage)
                
                const userData = { 
                    id: userId, 
                    name: userName, 
                    email: userEmail,
                    profileImage: profileImage
                };
                
                await AsyncStorage.setItem('userToken', token); // guardo el token
                await AsyncStorage.setItem('userId', userId.toString()); // guardo el id del usuario
                await AsyncStorage.setItem('username', userName.toString()); // guardo el name del usuario
                await AsyncStorage.setItem('email', userEmail.toString()); // guardo el email del usuario
                await AsyncStorage.setItem('isLoggedIn', 'true'); // guardo el estado de login


                setUser(userData);
                setIsLoggedIn(true);

                setEmail('');
                setPass('');
                setErrorMessage('');

                router.push('explore');
            } else {
                if (response.status == 429) {
                    setErrorMessage("Demasiados intentos")
                    return
                }
                const responseData = await response.json()

                console.log({responseData});
                
                setErrorMessage(responseData?.message || 'Contraseña o Email incorrecto');
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