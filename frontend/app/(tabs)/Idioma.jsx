import React from 'react';
import { Text, View } from 'react-native';
import { router, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { ButtonList } from '../../components/SocialButtons';

const Idioma = () => {

  return (
    <>
        <Stack.Screen
                options={{
                    title: 'Idioma',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#10132F' },
                    headerLeft: () => (
                        <AntDesign
                            name="arrowleft"
                            onPress={() => router.back()}
                            size={22}
                            color={'#ddd'}
                            style={{ paddingLeft: 20 }}
                        />
                    ),
                }}
            />
        <View style={{backgroundColor: '#10132F', height: '100%'}}>
            <Text style={{color: '#ddd', textAlign: 'center', fontSize: 25}}>Cambiar idioma</Text>
                <View style={{borderWidth: 2, borderRadius: 5, borderColor: '#ddd', margin: 10}}>
                    <ButtonList content={'Español'} action={() => handleLanguageChange('es')} />
                </View>

                <View style={{borderWidth: 2, borderRadius: 5, borderColor: '#ddd', margin: 10}}>
                    <ButtonList content={'Inglés'} action={() => handleLanguageChange('en')} />
                </View>
        </View>
    </>
  );
};

export default Idioma;
