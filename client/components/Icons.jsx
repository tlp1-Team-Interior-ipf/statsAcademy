import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Importar íconos de Ionicons

export const MyButton = ({ iconName, iconSize }) => {
  return (
    <TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Ionicons name={iconName} size={iconSize} color="white" />
      </View>
    </TouchableOpacity>
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
  
});


