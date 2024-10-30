import { StyleSheet, View, Text, Image, Animated, Pressable } from "react-native";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { AntDesign, EvilIcons, MaterialCommunityIcons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

const iconLibraries = {
  EvilIcons: EvilIcons,
  MaterialCommunityIcons: MaterialCommunityIcons,
  FontAwesome5: FontAwesome5,
  MaterialIcons: MaterialIcons,
  AntDesign: AntDesign,
  Entypo: Entypo
};

const MyCard = ({ title, subtitle, image, window, NameLibrariIcon, nameIcon, sizeIcon }) => {
  const [showContent, setShowContent] = useState(false);
  const maxHeight = useRef(new Animated.Value(0)).current;
  const IconComponent = iconLibraries[NameLibrariIcon];

  useEffect(() => {
    Animated.timing(maxHeight, {
      toValue: showContent ? 80 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showContent]);

  return (
    <View style={styles.container}>
      <Pressable style={{alignItems: 'center'}} onPress={() => router.push(window)}>
        {/* <Image source={image} style={styles.image} /> */}
        {IconComponent ? (
          <IconComponent name={nameIcon} size={sizeIcon} color={'#ddd'} />
          ) : (
              <Text>Icon not found</Text>
          )
        }
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
    backgroundColor: '#111762',
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
