import { FontAwesome } from '@expo/vector-icons';
import React, {useContext} from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { UserContext } from '@/context/userContext';

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
  const {user} = useContext(UserContext);
  return(
    <Pressable onPress={action}>
      <Image source={{uri: user.profileImage}} style={{width: 35, height: 35, borderWidth: 1, borderRadius: 50, borderColor: '#ddd'}} />
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
    marginHorizontal: -10,
    padding:0,
    justifyContent: 'center',
    alignItems: 'center'
  },
});


