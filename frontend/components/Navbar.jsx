import React, { useContext, useRef, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Pressable, Animated } from 'react-native';
import { Button } from '@rneui/themed';
import { UserContext } from '@/context/userContext';
import { router } from 'expo-router';
import { MyButton2 } from './Icons';

const Navbar = ({action}) => {
  const { isLoggedIn } = useContext(UserContext);


  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={require('@/img/tutorialogo.png')} style={styles.image} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!isLoggedIn && (
          <Button
            buttonStyle={{ paddingHorizontal: 45, borderRadius: 20 }}
            title="Login"
            onPress={() => router.push("Login")}
          />
        )}
        <Pressable style={{marginHorizontal: 10, paddingHorizontal: 10}}>
          <MyButton2 iconName={'menu'} iconSize={40} color={'#fff'} action={action}/>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#31f',
    marginVertical: 40,
  },
  item: {
    flexDirection: 'row',
    gap: 25,
    marginVertical: 10,
  },
  image: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
  },
});

export default Navbar;



//secundario
// Navbar actualizado

// import React, { useContext, useState, useRef, useEffect } from 'react';
// import { View, Image, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
// import { Button } from '@rneui/themed';
// import { UserContext } from '@/context/userContext';
// import { router } from 'expo-router';
// import { MyButton2 } from './Icons';
// import { Ionicons } from '@expo/vector-icons';


// const Navbar = () => {
//   const { isLoggedIn } = useContext(UserContext);
//   const [showDraw, setShowDraw] = useState(false);
//   const slideAnim = useRef(new Animated.Value(360)).current;
//   const drawerHeight = Dimensions.get('window').height;

//   useEffect(() => {
//     console.log("showDraw:", showDraw);
//     Animated.timing(slideAnim, {
//       toValue: showDraw ? 0 : 360,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [showDraw]);

//   const mostrar = () => {
//     console.log("dsmkdoso")
//     // setShowDraw(!showDraw);
//     setShowDraw(prevState => !prevState);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.item}>
//         <Image source={require('@/img/tutorialogo.png')} style={styles.image} />
//       </View>
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         {!isLoggedIn && (
//           <Button
//             buttonStyle={{ paddingHorizontal: 45, borderRadius: 20 }}
//             title="Login"
//             onPress={() => router.push("Login")}
//           />
//         )}
//         <Pressable style={{ marginHorizontal: 10, paddingHorizontal: 10 }} onPress={mostrar}>
//           <MyButton2 iconName={'menu'} iconSize={40} color={'#fff'} />
//         </Pressable>
//       </View>

//       {/* Drawer animado */}
//       <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }], height: drawerHeight }]}>
//         <Ionicons name='close' size={40} color={'#ddd'} onPress={mostrar} style={{ padding: 10 }} />
//         {isLoggedIn && (
//           <Button title={'CERRAR SESIÓN'}></Button>
//         )}
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#31f',
//     marginVertical: 40,
//   },
//   item: {
//     flexDirection: 'row',
//     gap: 25,
//     marginVertical: 10,
//   },
//   image: {
//     width: 35,
//     height: 35,
//     marginHorizontal: 10,
//   },
//   drawer: {
//     position: 'absolute',  // Asegúrate de que el drawer esté fuera del flujo normal
//     top: 0,
//     left: 0,
//     width: '80%',  // O ajusta según lo que necesites
//     height: '100%',
//     backgroundColor: '#fff',
//     zIndex: 1000, // Alto zIndex para estar sobre todo
//     elevation: 10, // Si estás en Android, también usa elevation
//   },
// });

// export default Navbar;


// otra prueba