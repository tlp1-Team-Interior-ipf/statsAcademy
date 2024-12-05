import { Feather, FontAwesome, Fontisto } from '@expo/vector-icons';
import React, {useContext} from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import { UserContext } from '../../context/userContext';

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
    <Pressable onPress={action} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 110}}>
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

export const IconProfile = ({iconName, iconSize, iconColor}) => {
    return(
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
    )
}

export const IconEmail = ({iconName, iconSize, iconColor}) => {
    return(
        <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
    )
}

export const IconSettings = ({iconName, iconSize, iconColor}) => {
    return(
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
    )
}

export const IconRight = ({iconName, iconSize, iconColor}) => {
    return(
        <AntDesign name={iconName} size={iconSize} color={iconColor} />
    )
}

export const IconBell = ({iconSize, iconColor}) => {
  return(
      <Fontisto name={'bell-alt'} size={iconSize} color={iconColor} />
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
    marginHorizontal: 5,
    padding:0,
    justifyContent: 'center',
    alignItems: 'center'
  },
});


