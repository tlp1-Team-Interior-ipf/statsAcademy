import {  NativeBaseProvider } from 'native-base';
import useAuth from '@/hooks/useAuth';
import ActionButtons from '@/hooks/ActionButtons';
import LoadingSpinner from '@/components/LoadingSpinner'
import { ScrollView, StyleSheet, View } from 'react-native';
import MyCard from '@/components/Card'
import Navbar from '@/components/Navbar'
import { Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Button } from '@rneui/themed';

const Explore = () => {
  const { loading } = useAuth();
  const image1 = require('@/img/calendar.png')
  const image2 = require('@/img/kanban.png')

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Navbar action={{}}/>
        <Stack.Screen options={{headerShown: false}} />
        <ActionButtons />  
          <View style={{gap: 10, marginVertical: 10}}>
            <MyCard title={'Organizador'} subtitle={'Organizador de tareas para gestionar actividades y otros eventos importantes'} image={image2} window={'Kanban'} />
            <MyCard title={'Calendario'} subtitle={'Calendario para definir fechas importantes'} image={image1} window={'Calendar'} />
          </View>

          <BlurView
          style={styles.blurView}
          tint='systemThinMaterialDark'
          // blurAmount={10}
          intensity={40}
        />
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Explore;
