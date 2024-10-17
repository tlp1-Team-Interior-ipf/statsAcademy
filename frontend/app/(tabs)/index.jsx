import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import { MyButton2 } from '@/components/Icons';
import { ButtonStart } from '@/components/SocialButtons'
import Navbar from '@/components/Navbar'
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

const data = [
  { id: 1, image: require('@/img/background2.jpg') },
  { id: 2, image: require('@/img/background1.jpg') },
  { id: 3, image: require('@/img/img2.jpg') },
];

export default function HomeScreen() {
  
  return (
    <>
      <Stack.Screen options={{headerShown: false}} />
      <View style={{backgroundColor: '#111'}}>
        <ScrollView>
          <Navbar/>
          <Text style={{ fontSize: 50, textAlign: 'left', paddingLeft: 10, color: '#fff' }}>Stats Academy</Text>
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

          <View style={{ margin: 10 }}>
            <View style={{ width: '100%', backgroundColor: '#66f', height: 200, padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <Text style={{ color: '#fff', fontSize: 30 }}>FORMA PARTE</Text>
              <Button title="Únete ahora" color={'#149'} />
            </View>
          </View>

          <View style={styles.footer}>
            <View>
              <Text style={{ color: '#fff', fontSize: 10 }}>Todos los derechos reservados © 2024</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 15, gap: 50 }}>
              <View>
                <Text style={{ color: '#fff', fontSize: 10, textAlign: 'center', marginBottom: 10 }}>Términos y Condiciones</Text>
                <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>StatsAcademy®</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                  <MyButton2 iconName={'logo-facebook'} />
                  <MyButton2 iconName={'logo-linkedin'} />
                  <MyButton2 iconName={'logo-instagram'} />
                  <MyButton2 iconName={'logo-github'} />
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 10, textAlign: 'center', marginBottom: 10 }}>Política de Privacidad</Text>
                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center' }}>CONTACTANOS</Text>
                <Text style={{ color: '#fff', fontSize: 9, textAlign: 'center' }}>statsacademy@gmail.com</Text>
              </View>
            </View>
          </View>

        </ScrollView>

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
