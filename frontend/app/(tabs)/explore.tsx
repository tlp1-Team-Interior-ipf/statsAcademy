import {  NativeBaseProvider } from 'native-base';
import useAuth from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner'
import { ScrollView, View } from 'react-native';
import MyCard from '@/components/Card'
import Navbar from '@/components/Navbar'
import { Stack } from 'expo-router';
import { Text } from 'react-native';

const Explore = () => {
  const { loading } = useAuth();
  const ImgChat = require('@/img/CHAT.jpg')
  const ImgKanban = require('@/img/Kanban2.png')
  const ImgCalendario = require('@/img/Calendario2.png')

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <NativeBaseProvider>
    <Stack.Screen options={{headerShown: false}} />
      <View style={{backgroundColor: '#111', height: '100%'}}>
        <ScrollView>
          <View style={{zIndex: 1}}>
            <Navbar/>
          </View>
          <Text style={{textAlign: 'center', fontSize: 35, color: '#ddd', top: -20}}>Bienvenido a tu inicio</Text>
            <View style={{gap: 10, marginVertical: 10}}>
              <MyCard title={'Organizador'} subtitle={'Organizador de tareas para gestionar actividades y otros eventos importantes'} image={ImgKanban} window={'Kanban'} />
              <MyCard title={'Calendario'} subtitle={'Calendario para definir fechas importantes'} image={ImgCalendario} window={'Calendar'} />
              <MyCard title={'Chat'} subtitle={'Chat para las clases interactivas'} image={ImgChat} window={'Chat'} />
            </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default Explore;
