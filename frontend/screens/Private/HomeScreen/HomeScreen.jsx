import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView } from 'react-native';
import React, {useContext, useEffect} from 'react';
import { UserContext } from '../../../context/userContext';
import Navbar from '../../../components/Navbar/Navbar';
import { Temas } from '../../../utils/selectTheme';
import { LibraryButton } from '../../../components/Buttons/LibraryButton/LibraryButton';
import { Topics } from '../../../components/Topics/Topics';
import { Topics2 } from '../../../components/Topics/Topics2';
import { ThematicUnit } from '../../../components/ThematicUni/ThematicUnit';

const HomeScreen = () => {
  const { isLoggedIn } = useContext(UserContext);

  const { BackgroundTheme } = Temas();

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
          { height: 2200, 
            backgroundColor: BackgroundTheme, 
            paddingTop: 30
          }}>
          
            <ThematicUnit ThematicUnit={'1 Conceptos básicos de a estadística'} />

            <Topics topicTop={140} topicLeft={100} />
            <Topics2 topicTop={260} topicLeft={150} />
            <Topics2 topicTop={380} topicLeft={190} />
            <Topics2 topicTop={500} topicLeft={170} />
            <Topics2 topicTop={620} topicLeft={100} />

            <View style={{top: 640}}>
              <ThematicUnit ThematicUnit={'2 Presentación de datos'} />
            </View>

            <Topics2 topicTop={833} topicLeft={50} />
            <Topics2 topicTop={950} topicLeft={70} />
            <Topics2 topicTop={1068} topicLeft={100} />
            <Topics2 topicTop={1186} topicLeft={140} />
            <Topics2 topicTop={1305} topicLeft={180} />

            <View style={{top: 1260}}>
              <ThematicUnit ThematicUnit={'2 Presentación de datos'} />
            </View>            

            <Topics2 topicTop={1520} topicLeft={140} />
            <Topics2 topicTop={1640} topicLeft={70} />
            <Topics2 topicTop={1765} topicLeft={110} />
            <Topics2 topicTop={1890} topicLeft={170} />
            <Topics2 topicTop={2015} topicLeft={140} />

        </View>
      </ScrollView>
          <LibraryButton />
    </>
  );
};

export default HomeScreen;
