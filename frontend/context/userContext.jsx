import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: null,
    username: null,
    profileImage: null,
  });

  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const checkLoginStatus = async () => {
      const value = await AsyncStorage.getItem('isLoggedIn');
      const username = await AsyncStorage.getItem('username');
      const email = await AsyncStorage.getItem('email');
      const profileImage = await AsyncStorage.getItem('profileImage')
      const storedTheme = await AsyncStorage.getItem('theme') || 'dark';

      setUser({
        email: email,
        username: username,
        profileImage: profileImage, 
      });
      
      setIsLoggedIn(value === 'true');
      setTheme(storedTheme);
    };
    
    checkLoginStatus();
  }, []);

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
    console.log("usuario: ", user.name)
    AsyncStorage.setItem('username', user.name);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, theme, toggleTheme, updateUserProfile }} >
      { children }
    </UserContext.Provider>
  )
};

export default UserProvider;
