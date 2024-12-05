import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, Text } from 'react-native';
import React, {useContext, useEffect} from 'react';
import { UserContext } from '../../../context/userContext';
import Navbar from '../../../components/Navbar/Navbar';
import { Temas } from '../../../utils/selectTheme';
import { LibraryButton } from '../../../components/Buttons/LibraryButton/LibraryButton';
import { Topics } from '../../../components/Topics/Topics';
import { Topics2 } from '../../../components/Topics/Topics2';
import { ThematicUnit } from '../../../components/ThematicUni/ThematicUnit';
import { Topics3 } from '../../../components/Topics/Topics3';
import { Topics1 } from '../../../components/Topics/Topics1';
import { ThematicUnit2 } from '../../../components/ThematicUni/ThematicUnit2';
import { ThematicUnit1 } from '../../../components/ThematicUni/ThematicUnit1';
import BackgroundPoints from '../../../components/Bcakground/Background';

const HomeScreen = () => {
  const { BackgroundTheme } = Temas();
  const { isLoggedIn } = useContext(UserContext);

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
            <BackgroundPoints positionBackground={5} />
            <ThematicUnit ThematicUnit={'1 Conceptos básicos de estadística'} />

            <Topics topicTop={140} topicLeft={100} />
            <Topics1 topicTop={260} topicLeft={150} />
            <Topics1 topicTop={380} topicLeft={190} />
            <Topics1 topicTop={500} topicLeft={170} />
            <Topics1 topicTop={620} topicLeft={100} />

            <BackgroundPoints positionBackground={760} />

            <View style={{top: 617}}>
              <ThematicUnit1 ThematicUnit={'2 Presentación de datos'} />
            </View>

            <Topics2 topicTop={833} topicLeft={50} />
            <Topics2 topicTop={950} topicLeft={70} />
            <Topics2 topicTop={1068} topicLeft={100} />
            <Topics2 topicTop={1186} topicLeft={140} />
            <Topics2 topicTop={1305} topicLeft={180} />

            <BackgroundPoints positionBackground={1605} />

            <View style={{top: 1220}}>
              <ThematicUnit2 ThematicUnit={'2 Estadística descriptiva'} />
            </View>            

            <Topics3 topicTop={1520} topicLeft={140} />
            <Topics3 topicTop={1640} topicLeft={70} />
            <Topics3 topicTop={1765} topicLeft={110} />
            <Topics3 topicTop={1890} topicLeft={170} />
            <Topics3 topicTop={2015} topicLeft={140} />

        </View>
      </ScrollView>
          <LibraryButton />
    </>
  );
};

export default HomeScreen;
