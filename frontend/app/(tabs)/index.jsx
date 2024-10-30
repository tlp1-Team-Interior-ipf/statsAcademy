import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import { MyButton2 } from '@/components/Icons';
import { ButtonStart } from '@/components/SocialButtons'
import Navbar from '@/components/Navbar'
import { Stack } from 'expo-router';
import  MyStagger  from '@/components/StaggerButtons'
import { useFonts, Kufam_400Regular } from '@expo-google-fonts/kufam';

const { width } = Dimensions.get('window');

const data = [
  { id: 1, image: require('@/img/background2.jpg') },
  { id: 2, image: require('@/img/background1.jpg') },
  { id: 3, image: require('@/img/img2.jpg') },
  
];

const tutorBanner = require('@/img/los elegiiiidooss/tutorbanner.png');
const tutoriaLogo = require('@/img/tutorialogo.png');
const anotadorSinFondo = require('@/img/los elegiiiidooss/anotadorSinFondo.png');
const calendarioSinFondo = require('@/img/los elegiiiidooss/calendarioSinFondo.png');
const studentprofile = require('@/img/los elegiiiidooss/studentprofile.png');

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Kufam_400Regular,
  });
  
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  
  return (
    <>
      <Stack.Screen options={{headerShown: false}} />
      <View style={{backgroundColor: '#10132F'}}>
        <ScrollView>
          <View style={{zIndex: 1}}>
            <Navbar />
          </View>
          <Text style={{ fontSize: 50, textAlign: 'left', paddingLeft: 10, color: '#fff', fontFamily: 'Kufam_400Regular'  }}>Stats Academy</Text>
          <Text style={{ fontSize: 30, textAlign: 'left', paddingLeft: 10, color: '#fff' }}>Aprendizaje en Estadística</Text>
          <Text style={{ fontSize: 22, textAlign: 'left', paddingLeft: 10, color: '#fff' }}>
            Descubre la manera más efectiva de aprender Estadística con nuestra tutoria personalizada
          </Text>
          <ButtonStart />
          <View>
            <Carousel
              width={width}
              height={300}
              autoPlay={true}
              data={data}
              scrollAnimationDuration={3000}
              loop
              renderItem={({ item }) => (
                <View style={{ margin: 10, top: 40 }}>
                  <Image source={item.image} style={{ width: '100%', height: 200 }} />
                </View>
              )}
            />
          </View>

          <View style={{ backgroundColor: '#04617c', margin: 'auto', paddingHorizontal: 0, width: 510, paddingVertical: 20, alignItems: 'center' }}>
            <View style={{ width: 450, backgroundColor: '#5bc8ca',  marginHorizontal: 0, justifyContent: 'space-between',  borderRadius: 5, flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{ color: '#fff', fontSize: 30, width: 250, textAlign: 'center' }}>¡Prueba Gaus! Nuestro tutor inteligente</Text>
                <Button title="Únete ahora" color={'#058b94'} buttonStyle={{margin: 'auto', marginVertical: 10, borderRadius: 5 }} />
              
              </View>
              <View style={{ flexDirection: 'column' }}>
                  <Image source={tutorBanner} style={{ width:160, height:180, position: 'absolute', top: -135, left: -80, zIndex: 10}} />
                  <Image source={tutoriaLogo} style={{ width:100, height:80, zIndex: 10, top: 80, left: -50 }} />
              </View>
            </View>
          </View>
              <View style={{ backgroundColor: '#0b246c', width: '100%', height: '30%'}}>
                <Text style={{ textAlign: 'center', color: '#ddd', fontSize: 25, top: 25 }}>Tenemos las herramientas que necesitas</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20, alignItems: 'center', top: 50}}>
                  <View style={{borderWidth: 1, borderColor: '#3366ff80', borderRadius: 2, backgroundColor: '#3366ff50'}}>
                  <Image source={studentprofile} style={{ width:140, height:140, marginVertical: 10 }}/>
                    <View style={{backgroundColor: '#3366ff80', height: 40, justifyContent: 'center'}}>
                      <Text style={{ textAlign: 'center', fontSize: 17, color: '#ddd'}}>Perfil de Alumno</Text>
                    </View>
                  </View>
                  <View style={{borderWidth: 1, borderColor: '#3366ff80', borderRadius: 2, backgroundColor: '#3366ff50'}}>
                  <Image source={anotadorSinFondo} style={{ width:140, height:140, marginVertical: 10 }}/>
                    <View style={{backgroundColor: '#3366ff80', height: 40, justifyContent: 'center' }} > 
                      <Text style={{ textAlign: 'center', fontSize: 17, color: '#ddd'}}>Anotador</Text>
                    </View>
                  </View>
                  <View style={{borderWidth: 1, borderColor: '#3366ff80', borderRadius: 2, backgroundColor: '#3366ff50'}}>
                    <Image source={calendarioSinFondo} style={{ width:150, height:160 }}/>
                    <View style={{backgroundColor: '#3366ff80', height: 40, justifyContent: 'center'}} >
                      <Text style={{ textAlign: 'center', fontSize: 17, color: '#ddd'}}>Calendario</Text></View>  
                  </View>
                </View>
              </View>
        </ScrollView>
              <MyStagger />

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#31f',
    marginVertical: 40,
  },
  text: {
    color: '#fff',
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
  footer: {
    backgroundColor: '#21b',
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    padding: 5,
  },
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