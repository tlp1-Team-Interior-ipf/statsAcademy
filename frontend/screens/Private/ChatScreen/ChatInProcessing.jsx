import React from 'react';
import { View, Text, Image } from 'react-native';
import { Temas } from '../../../utils/selectTheme';

const ChatInProcessing = () => {
  const { BackgroundTheme, TextBackgroundTheme } = Temas();

  return (
    <View style={
      { height: '100%', 
        backgroundColor: BackgroundTheme, 
        paddingTop: 30
      }}>
      <Text style={{color: TextBackgroundTheme}}>¡Hola! Soy Gauss tu tutor, en este momento estoy preparando esta clase.</Text>
      <Image source={{uri: '../../../assets/tutor.jpg'}} style={{width: 100, height: 100}} />
    </View>
  );
};

export default ChatInProcessing;