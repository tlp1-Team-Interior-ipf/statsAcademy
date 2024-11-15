import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { router, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import i18next, {languageResources} from '../../utils/i18next'
import {useTranslation} from 'react-i18next';
import languagesList from '../../languages/languagesList.json'

const Idioma = () => {

    const [visible, setVisible] = useState(false);
    const {t} = useTranslation();

    const changeLng = lng => {
        i18next.changeLanguage(lng);
        setVisible(false);
    };

  return (
    <>
        <Stack.Screen
                options={{
                    title: t('language'),
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#332288' },
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
        <View style={{backgroundColor: '#332288', height: '100%'}}>
            <Text style={{color: '#ddd', textAlign: 'center', fontSize: 25}}>{t('change-language')}</Text>
            <Text style={{color: '#ddd', padding: 10, textAlign: 'center', justifyContent: 'center'}}>{t('welcome')}</Text>
            <FlatList
                data={Object.keys(languageResources)}
                renderItem={({item}) => (
                <TouchableOpacity
                    style={{borderWidth: 2, borderRadius: 5, borderColor: '#ddd', margin: 10}}
                    onPress={() => changeLng(item)}>
                    <Text style={{color: '#ddd', padding: 10, textAlign: 'center', justifyContent: 'center'}}>
                    {languagesList[item].nativeName}
                    </Text>
                </TouchableOpacity>
                )}
            />
        </View>
    </>
  );
};

export default Idioma;
