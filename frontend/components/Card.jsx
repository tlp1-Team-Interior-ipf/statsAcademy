import { StyleSheet, View, Text, Image, Animated, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";

const MyCard = ({ title, subtitle, image, window }) => {
  const [showContent, setShowContent] = useState(false);
  const maxHeight = useRef(new Animated.Value(0)).current; // Controlar la altura máxima del contenedor

  useEffect(() => {
    Animated.timing(maxHeight, {
      toValue: showContent ? 80 : 0, // Ajustar la altura máxima según el contenido
      duration: 300,
      useNativeDriver: false, // Necesitamos que esto sea false para animar la maxHeight
    }).start();
  }, [showContent]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push(window)}>
        <Image source={image} style={styles.image} />
      </Pressable>
      <AntDesign 
        name={showContent ? "down" : "up"} 
        size={24} 
        color={'#fff'}
        style={styles.icon} 
        onPress={() => setShowContent(!showContent)} 
      />

      {/* Animated View que cambia su maxHeight */}
      <Animated.View style={[styles.content, { maxHeight }]}>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
        <Text>{subtitle}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    margin: 'auto',
    // Propiedades de sombra para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    width: 250,
    height: 190,
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    top: 165,
    backgroundColor: '#99999999',
    borderRadius: 50,
    padding: 5
},
  content: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyCard;
