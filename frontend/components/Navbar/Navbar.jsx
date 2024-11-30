import React, { useContext } from 'react';
import { View, Image, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { ButtonAccount, ButtonNotify, ButtonSettings } from '../Buttons/ButtonsRedirects';
import { UserContext } from '../../context/userContext';
import { Temas } from '../../utils/selectTheme';

const Navbar = () => {
  const { isLoggedIn, user } = useContext(UserContext);

  const { BackgroundTheme } = Temas();
  return (
    <View style={[styles.container, { backgroundColor: BackgroundTheme }]}>
        <ButtonAccount/>
        <View style={styles.navBarStyle}>
            <ButtonNotify />
            <ButtonSettings />
        </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  item: {
    flexDirection: 'row',
    gap: 25,
    marginVertical: 10,
  },
  image: {
    width: 35,
    height: 30,
    marginHorizontal: 10,
  },
  navBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  }
});

export default Navbar;
