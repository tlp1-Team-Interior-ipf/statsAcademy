import { StyleSheet, View, Text, Image, Animated, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";

const MyCard = ({ title, subtitle, image, window }) => {
  const [showContent, setShowContent] = useState(false);
  const maxHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(maxHeight, {
      toValue: showContent ? 80 : 0,
      duration: 300,
      useNativeDriver: false,
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
        color={'#ddd'}
        style={styles.icon} 
        onPress={() => setShowContent(!showContent)} 
      />

      <Animated.View style={[styles.content, { maxHeight }]}>
        <Text style={{fontWeight: 'bold', color:'#ddd'}}>{title}</Text>
        <Text style={{ color:'#ddd' }}>{subtitle}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: '#111',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    margin: 'auto',
     // Sombra para iOS
     shadowColor: 'gray',
     shadowOffset: {
       width: 0,
       height: 4,
     },
     shadowOpacity: 0.1,
     shadowRadius: 8,
     // Sombra para Android
     elevation: 4,
     justifyContent: 'center',
     alignItems: 'center',
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
