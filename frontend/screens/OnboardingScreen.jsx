import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const completeOnboarding = async () => {
    const asyncstorage = await AsyncStorage.setItem('isOnboardingCompleted', 'true');
    console.log("asyncstorage: ", asyncstorage);
    
    navigation.replace('Login');
  };

  return (
    <>
        <Onboarding
            onDone={completeOnboarding}
            onSkip={completeOnboarding}
            pages={[
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/kanban.png')} style={{width:100, height:100}} />,
                title: 'Bienvenido a la App',
                subtitle: 'Explora todas las funcionalidades de nuestra app.',
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/tutor.jpg')}  style={{width:100, height:100}}/>,
                title: 'Gestiona tus tareas',
                subtitle: 'Mantén tus tareas organizadas y bajo control.',
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/tutorialogo.png')}  style={{width:100, height:100}}/>,
                title: 'Comienza ahora',
                subtitle: 'Inicia sesión o regístrate para comenzar.',
                },
            ]}
        />
    </>
  );
};

export default OnboardingScreen;
