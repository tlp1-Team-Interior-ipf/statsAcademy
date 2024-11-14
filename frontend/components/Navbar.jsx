import React, { useContext } from 'react';
import { View, Image, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { MyButton2 } from './Icons';
import { ButtonProfile } from './Icons';
import { UserContext } from '@/context/userContext';
import { ShowDrawer } from '@/hooks/showDrawer';
import MyDrawer from '@/components/MyDrawer'
import { Ionicons } from '@expo/vector-icons';

const Navbar = () => {
  const { isLoggedIn, user } = useContext(UserContext);
  const { mostrar, slideAnim,  } = ShowDrawer();

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={require('@/img/tutorialogo.png')} style={styles.image} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable style={{marginHorizontal: 10, paddingHorizontal: 10}}>
          {isLoggedIn ? 
              (
                <View>
                  {user.profileImage ? (
                    <Pressable 
                      style={{ ustifyContent: 'center', alignItems: 'center'}}
                      onPress={() => mostrar()}
                    >
                      <Image 
                        source={{uri: user.profileImage}} 
                        style={{width: 41, height: 41, borderWidth: 1, borderColor: '#ddd', borderRadius: 50}} 
                      />
                  
                    </Pressable>
                  ): <Pressable 
                        style={{borderWidth: 1, borderRadius: 25, width: 40, height: 40, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => mostrar()}
                      >
                    <Ionicons
                        name="person" 
                        size={30} 
                        color={'#ddd'}
                      />
                  </Pressable>
                  }
                </View>
              )
            : (
            
              <Pressable 
                style={{borderWidth: 1, borderRadius: 25, width: 40, height: 40, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => mostrar()}
              >
            <Ionicons
                name="person" 
                size={30} 
                color={'#ddd'}
              />
          </Pressable>
            )
          }

          
        </Pressable>

        <MyDrawer mostrar={mostrar} slideAnim={slideAnim}/>
      </View>
    </View>
  );

};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  item: {
    flexDirection: 'row',
    gap: 25,
    marginVertical: 10,
  },
  image: {
    width: 35,
    height: 30,
    marginHorizontal: 10,
  },
});

export default Navbar;
