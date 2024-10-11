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

export const MyButton2 = ({ iconName, iconSize }) => {
  return (
    <Pressable>
      <View style={styles.buttonContainer2}>
        <Ionicons name={iconName} size={iconSize} color="white" />
      </View>
    </Pressable>
  );
};

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
    width:25,
    marginHorizontal: 0,
    padding:0,
    justifyContent: 'center',
    alignItems: 'center'
  },
});


