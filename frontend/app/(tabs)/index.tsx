import {  NativeBaseProvider } from 'native-base';
import useAuth from '@/hooks/useAuth';
import { Pressable, ScrollView, View } from 'react-native';
import MyCard from '@/components/Card'
import Navbar from '@/components/Navbar'
import { Stack } from 'expo-router';
import { Text } from 'react-native';
import  MyStagger  from '@/components/StaggerButtons'
import { Video } from 'expo-av';
import {useTranslation} from 'react-i18next';
import { Temas } from '@/utils/selectTheme';

const Explore = () => {
  const {t} = useTranslation();

  const { loading } = useAuth();
  const loading2 = require('../../assets/images/loading4.mp4');

  if (loading) {
    return (
      <>
      <View style={{backgroundColor: '#332288', height: '100%'}}>
        <Stack.Screen options={{headerShown: false}} />
        <Video 
          source={loading2} style={{width:250, height: 250}} rate={1.0} // Velocidad de reproducción
          volume={1.0} // Nivel de volumen
          isMuted={true} // Muteado
          shouldPlay={true} // Debería reproducirse automáticamente
          isLooping={false} // No repetir el video (opcional)
          useNativeControls={false} 
        />
      </View>
      </>
    )
  }

  const { 
    BackgroundTheme
  } = Temas();

  return (
    <NativeBaseProvider>
    <Stack.Screen options={{headerShown: false}} />
      <View style={{backgroundColor: BackgroundTheme, height: 1000}}>
        <ScrollView>
          <View style={{zIndex: 1}}>
            <Navbar/>
          </View>
          {/* <Text style={{textAlign: 'center', fontSize: 35, color: '#ddd', top: -20}}>{t('Welcome-home')}</Text>
            
            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{gap: 10, marginVertical: 10}}>
                <MyCard title={t('Title-card-1')} subtitle={t('Card-1')} image={null} window={'Chat'} NameLibrariIcon={"Entypo"} nameIcon={"chat"} sizeIcon={130} />
                <MyCard title={t('Title-card-2')} subtitle={t('Card-2')} image={null} window={'Kanban'} NameLibrariIcon={"FontAwesome5"} nameIcon={"tasks"} sizeIcon={130} />
                <MyCard title={t('Title-card-5')} subtitle={t('Card-5')} image={null} window={'Library'} NameLibrariIcon={"MaterialCommunityIcons"} nameIcon={"bookshelf"} sizeIcon={130} />
              </View>
              <View style={{gap: 10, marginVertical: 10}}>
                <MyCard title={t('Title-card-3')} subtitle={t('Card-3')} image={null} window={'Calendar'} NameLibrariIcon={"AntDesign"} nameIcon={"calendar"} sizeIcon={130} />
                <MyCard title={t('Title-card-4')} subtitle={t('Card-4')} image={null} window={'userProfile'} NameLibrariIcon={"Ionicons"} nameIcon={"stats-chart"} sizeIcon={130} />
                <MyCard title={t('Title-card-6')} subtitle={t('Card-6')} image={null} window={'QuizGame'} NameLibrariIcon={"MaterialCommunityIcons"} nameIcon={"gamepad-up"} sizeIcon={130} />
              </View>
            </View>
      <MyStagger /> */}
      
            <Pressable 
              android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 170}}
              style={{justifyContent:'center',  width: 100, height: 100, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, position: 'absolute', top: 600, left: 200}}>
                <Text style={{color: '#ddd', textAlign: 'center', fontSize: 25}}>Tema</Text>
            </Pressable>

            <Pressable 
              android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 170}}
              style={{justifyContent:'center',  width: 100, height: 100, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, position: 'absolute', top: 400, left: 50}}>
                <Text style={{color: '#ddd', textAlign: 'center', fontSize: 25}}>Tema</Text>
            </Pressable>

            <Pressable 
              android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 170}}
              style={{justifyContent:'center',  width: 100, height: 100, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, position: 'absolute', top: 200, left: 200}}>
                <Text style={{color: '#ddd', textAlign: 'center', fontSize: 25}}>Tema</Text>
            </Pressable>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default Explore;
