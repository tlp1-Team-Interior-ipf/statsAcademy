import React, { useEffect, useState } from 'react';
import { Text, View, Switch, FlatList, Pressable } from 'react-native';
import { Button } from '@rneui/themed'
import { router, Stack } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import i18next, {languageResources} from '../../utils/i18next'
import {useTranslation} from 'react-i18next';
import languagesList from '../../languages/languagesList.json'

const Setting = () => {

  const {t} = useTranslation();

    const [activeLanguage, setActiveLanguage] = useState(i18next.language);

    const changeLng = lng => {
      i18next.changeLanguage(lng);
      setActiveLanguage(lng);
    };

    useEffect(() => {
      setActiveLanguage(i18next.language);
    }, []);

  return (
    <>
    <Stack.Screen 
    options={{
      title: t('Configuration'),
      headerShown: true,
      headerBackTitleVisible: true,
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#332288' },
      headerLeft: () => (
          <AntDesign name='arrowleft' onPress={() => router.back()} size={22} color={'#ddd'} style={{ paddingLeft: 10 }} />
      ),
    }} />

    <View style={{height: '100%', backgroundColor: '#332288', paddingTop: 30}}>
      <Text style={{textAlign: 'center', color: '#ddd', fontSize: 20, fontWeight: 'bold', top: -15}}>{t('Config-title')}</Text>
      <View style={{alignItems:'flex-start', top: 20, justifyContent: 'flex-start'}}>

        <Text style={{color: '#ddd', fontSize: 17, fontWeight: 'bold', padding: 10}}>
          {t('Config-subtitle-1')}
        </Text>
        <View style={{alignItems: 'center', width: '100%'}}>
          
          <View style={{borderWidth: 1, borderRadius: 5, borderColor: '#ddd', width: 350}}>
          <View style={{flexDirection: 'row', gap: 200, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5,}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, width: 70}}>
              <Feather name='moon' size={22} color={'#ddd'} />     
              <Text style={{color: '#ddd', fontSize: 16}}>{t('Config-row-1')}</Text>      
            </View>       
            <Switch style={{}}/>
          </View>

          <View style={{flexDirection: 'row', gap: 210, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderTopWidth: 1, borderColor: '#ddd'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, width: 60}}>
              <Feather name='sun' size={22} color={'#ddd'} />     
              <Text style={{color: '#ddd', fontSize: 16}}>{t('Config-row-2')}</Text>      
            </View>       
            <Switch style={{}} />
          </View>
          </View>
        
          
        </View>

        <Text style={{color: '#ddd', fontSize: 17, fontWeight: 'bold', padding: 10, top: 10}}>
        {t('Config-subtitle-2')}
        </Text>
        
        <View style={{alignItems: 'center', width: '100%', padding: 5}}>
          <FlatList
            data={Object.keys(languageResources)}
            renderItem={({item}) => (
            <View
                style={{borderWidth: 1, borderRadius: 5, borderColor: '#ddd', width: 349, marginVertical: 5, flexDirection: 'row', gap: 220, justifyContent: 'center', alignItems: 'center'}}
                >
                <Text style={{color: '#ddd', padding: 10, fontSize: 17, textAlign: 'center', justifyContent: 'center'}}>
                {languagesList[item].nativeName}
                </Text>
                <Switch 
                  value={activeLanguage === item}
                  onValueChange={() => changeLng(item)} 
                />
            </View>
            )}
            />
        </View>
        <View style={{ margin: 'auto'}}>
          <Button
            buttonStyle={{ paddingHorizontal: 15, borderRadius: 5, width: 120, height: 35, margin: 10 }}
            color={'#149'}
            >
              <Text style={{color: '#fff', fontSize: 17}}>{t('Config-save')}</Text>
            </Button>
        </View>
      </View>
    </View>
    </>
  );
};

export default Setting;
