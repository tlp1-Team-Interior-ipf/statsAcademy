import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light')

  const [user, setUser] = useState({
        email: null,
        username: null,
        profileImage: null,
      });

    useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn');
      console.log("Estado de login al cargar la app: ", loginStatus);
      
      const username = await AsyncStorage.getItem('username');
      const email = await AsyncStorage.getItem('email');
      const profileImage = await AsyncStorage.getItem('profileImage')
      const storedTheme = await AsyncStorage.getItem('theme') || 'dark';

      setUser({
        email: email,
        username: username,
        profileImage: profileImage, 
      });
      
      setIsLoggedIn(loginStatus === 'true');
      setTheme(storedTheme);
    };
    
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return <Text>Loading...</Text>;
  }

    const toggleTheme = async () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme);
      };

      const updateUserProfile = (newProfileImage) => {
        
            setUser((prevUser) => ({
              ...prevUser,
              profileImage: newProfileImage,
            }));
            
            const userNameUnique = user.name;
            const profileImageKey = `profileImageKey_${userNameUnique}`;
        
            AsyncStorage.setItem(profileImageKey, newProfileImage);
            AsyncStorage.setItem('username', user.username);
          };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, toggleTheme, theme, user, setUser, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
