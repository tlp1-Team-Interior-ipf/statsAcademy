import {  NativeBaseProvider } from 'native-base';
import useAuth from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner'
import { ScrollView, View } from 'react-native';
import MyCard from '@/components/Card'
import Navbar from '@/components/Navbar'
import { Stack } from 'expo-router';
import { Text } from 'react-native';
import  MyStagger  from '@/components/StaggerButtons'

const Explore = () => {
  const { loading } = useAuth();
  const ImgChat = require('@/img/los elegiiiidooss/gausvector2.png')
  const ImgKanban = require('@/img/los elegiiiidooss/todoapp.png')
  const ImgCalendario = require('@/img/los elegiiiidooss/tools.png')

  if (loading) {
    return <LoadingSpinner />
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
              <MyCard title={'Organizador'} subtitle={'Organizador de tareas para gestionar actividades y otros eventos importantes'} image={null} window={'Kanban'} NameLibrariIcon={"FontAwesome5"} nameIcon={"tasks"} sizeIcon={170} />
              <MyCard title={'Calendario'} subtitle={'Calendario para definir fechas importantes'} image={null} window={'Calendar'} NameLibrariIcon={"AntDesign"} nameIcon={"calendar"} sizeIcon={170} />
            </View>
        </ScrollView>
      </View>
      <MyStagger />
    </NativeBaseProvider>
  );
};

export default Explore;
