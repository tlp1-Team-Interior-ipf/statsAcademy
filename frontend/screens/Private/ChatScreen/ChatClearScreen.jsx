import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Temas } from '../../../utils/selectTheme';
import { RotateInDownLeft } from 'react-native-reanimated';

const ChatClearScreen = () => {
  const { BackgroundTheme, TextBackgroundTheme } = Temas();
  const tutor = require('../../../assets/tutorprepara.png')

  return (
    <View style={
      { height: '100%', 
        backgroundColor: BackgroundTheme, 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <View style={stylesChatClear.containerGlob}>
        <View style={stylesChatClear.newContainer}>
            <Text style={stylesChatClear.textTutor}>¡Hola! Estoy preparando esta clase, vuelve pronto!</Text>
        </View>
      <View style={stylesChatClear.subContainerGlob}></View>
      </View>
      <Image source={tutor} style={stylesChatClear.imageTutor} /> 
    </View>
  );
};

export default ChatClearScreen;


const stylesChatClear = StyleSheet.create({

    containerGlob: {
        backgroundColor: '#fff', 
        width: 200, 
        height: 100, 
        position: 'absolute', 
        top: 120, 
        borderRadius: 50,
        borderWidth: 1,
        zIndex: 5
    },

    newContainer: {
        backgroundColor: '#fff', 
        width: 190, 
        height: 98, 
        position: 'absolute', 
        top: 0,
        left: 5, 
        borderRadius: 50,
        zIndex: 14

    },

    subContainerGlob: {
        backgroundColor: '#fff', 
        width: 100, 
        height: 50, 
        position: 'absolute', 
        top: 40,
        left: 50, 
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25, 
        borderBottomRightRadius: 25, 
        transform: [{rotate: '-45deg'}],
        borderWidth: 1,
        zIndex: 5
    },

    textTutor: {
        fontSize: 17,
        color: '#000',
        textAlign: 'center',
        width: 180,
        left: 10,
        zIndex: 15,
        top: 25
    },

    imageTutor: {
        width: 200, 
        height: 200
    }
})