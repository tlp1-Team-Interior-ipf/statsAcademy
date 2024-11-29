import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView } from 'react-native';
import React, {useContext, useEffect} from 'react';
import { UserContext } from '../../../context/userContext';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../../components/Navbar/Navbar';
import { Temas } from '../../../utils/selectTheme';
import { LibraryButton } from '../../../components/Buttons/LibraryButton/LibraryButton';
import { Topics } from '../../../components/Topics/Topics';
import { ThematicUnit } from '../../../components/ThematicUni/ThematicUnit';

const HomeScreen = () => {
  const { isLoggedIn } = useContext(UserContext);
  const navigation = useNavigation();

  const { BackgroundTheme, TextBackgroundTheme } = Temas();

  useEffect(() => {
    const verify = async () => {
      const login = await AsyncStorage.getItem('isLoggedIn');
      console.log("¿El usuario tiene permiso para estar en esta ruta?: ", login);
    }
    verify();
  }, [isLoggedIn])

  

  return (
    <>
      <Navbar />

      <ScrollView>
        <View style={
          { height: 1550, 
            backgroundColor: BackgroundTheme, 
            paddingTop: 30
          }}>
          
            <ThematicUnit ThematicUnit={'1'} />

            <Topics topicTop={140} topicLeft={100} />
            <Topics topicTop={260} topicLeft={150} />
            <Topics topicTop={380} topicLeft={190} />
            <Topics topicTop={500} topicLeft={170} />
            <Topics topicTop={620} topicLeft={100} />
            <Topics topicTop={740} topicLeft={50} />
            <Topics topicTop={860} topicLeft={70} />
            <Topics topicTop={980} topicLeft={100} />
            <Topics topicTop={1100} topicLeft={140} />
            <Topics topicTop={1220} topicLeft={180} />
            
            <View style={{top: 1260}}>
              <ThematicUnit ThematicUnit={'2'} />
            </View>

            <Topics topicTop={1413} topicLeft={140} />


        </View>
      </ScrollView>
          <LibraryButton />
    </>
  );
};

export default HomeScreen;
