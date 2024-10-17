import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

export const MyButton = ({ iconName, iconSize }) => {
  return (
    <TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Ionicons name={iconName} size={iconSize} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export const MyButton2 = ({ iconName, iconSize, color, action }) => {
  return (
    <Pressable onPress={action}>
      <View style={styles.buttonContainer2}>
        <FontAwesome name={iconName} size={iconSize} color={color} />
      </View>
    </Pressable>
  );
};

export const ButtonProfile = ({action}) => {
  return(
    <Pressable onPress={action}>
      <View style={{width: 35, height: 35, borderWidth: 1, borderRadius:25, borderColor: '#ddd'}}></View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width:35
  },
  
  buttonContainer2: {
    flexDirection: 'row',
    width:40,
    marginHorizontal: 0,
    padding:0,
    justifyContent: 'center',
    alignItems: 'center'
  },
});


