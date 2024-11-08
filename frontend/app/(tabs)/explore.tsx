import {  NativeBaseProvider } from 'native-base';
import useAuth from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner'
import { ScrollView, View } from 'react-native';
import MyCard from '@/components/Card'
import Navbar from '@/components/Navbar'
import { Stack } from 'expo-router';
import { Text } from 'react-native';
import  MyStagger  from '@/components/StaggerButtons'
import { Video } from 'expo-av';

const Explore = () => {
  const { loading } = useAuth();
  const ImgChat = require('@/img/los elegiiiidooss/gausvector2.png')
  const ImgKanban = require('@/img/los elegiiiidooss/todoapp.png')
  const ImgCalendario = require('@/img/los elegiiiidooss/tools.png')
  const loading2 = require('../../assets/images/loading4.mp4');

  if (loading) {
    return (
      <>
      <View style={{backgroundColor: '#10132F', height: '100%'}}>
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

  return (
    <NativeBaseProvider>
    <Stack.Screen options={{headerShown: false}} />
      <View style={{backgroundColor: '#10132F', height: '100%'}}>
        <ScrollView>
          <View style={{zIndex: 1}}>
            <Navbar/>
          </View>
          <Text style={{textAlign: 'center', fontSize: 35, color: '#ddd', top: -20}}>Bienvenido a tu inicio</Text>
            <View style={{gap: 10, marginVertical: 10}}>
              <MyCard title={'Chat'} subtitle={'Chat para las clases interactivas'} image={null} window={'Chat'} NameLibrariIcon={"Entypo"} nameIcon={"chat"} sizeIcon={170} />
              <MyCard title={'Organizador'} subtitle={'Organizador para gestionar actividades, objetivos, metas y otros eventos importantes'} image={null} window={'Kanban'} NameLibrariIcon={"FontAwesome5"} nameIcon={"tasks"} sizeIcon={170} />
              <MyCard title={'Calendario'} subtitle={'Calendario para definir fechas importantes'} image={null} window={'Calendar'} NameLibrariIcon={"AntDesign"} nameIcon={"calendar"} sizeIcon={170} />
            </View>
        </ScrollView>
      <MyStagger />
      </View>
    </NativeBaseProvider>
  );
};

export default Explore;
