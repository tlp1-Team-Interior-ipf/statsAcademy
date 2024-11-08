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

  useEffect(() => {
    const checkLoginStatus = async () => {
      const value = await AsyncStorage.getItem('isLoggedIn');
      const username = await AsyncStorage.getItem('username');
      const email = await AsyncStorage.getItem('email');
      const profileImage = await AsyncStorage.getItem('profileImage')
      setUser({
        email: email,
        username: username,
        profileImage: profileImage, 
      });
      
      setIsLoggedIn(value === 'true');
    };
    
    checkLoginStatus();
  }, []);

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
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
