import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Switch, FlatList, Pressable } from 'react-native';

import { Button } from '@rneui/themed';
import { router, Stack } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import i18next, {languageResources} from '../../utils/i18next';
import { useTranslation } from 'react-i18next';
import languagesList from '../../languages/languagesList.json';
import { UserContext } from '../../context/userContext';
import { Temas } from '../../utils/selectTheme';
const Setting = () => {

  const { theme, toggleTheme } = useContext(UserContext);
  const {t} = useTranslation();

  const [activeLanguage, setActiveLanguage] = useState(i18next.language);

  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setActiveLanguage(lng);
  };

const { 
  ButtonRadioTheme, 
  ButtonRadioTheme2, 
  selectBackgroundTheme, 
  selectButtonRadioTheme, 
  selectButtonRadioTheme2, 
  selectTextTheme 
} = Temas();

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
      headerTintColor: selectTextTheme,
      headerStyle: { backgroundColor: selectBackgroundTheme },
      headerLeft: () => (
          <AntDesign name='arrowleft' onPress={() => router.back()} size={22} color={theme === 'dark' ? '#ddd' : '#000'} style={{ paddingLeft: 10 }} />
      ),
    }} />

    <View style={
            { height: '100%', 
              backgroundColor: selectBackgroundTheme, 
              paddingTop: 30}}
          >
      <Text style={
              { textAlign: 'center', 
                color:selectTextTheme, 
                fontSize: 20, 
                fontWeight: 'bold', 
                top: -15}}>
                  {t('Config-title')}
      </Text>
      <View style={{alignItems:'flex-start', top: 20, justifyContent: 'flex-start'}}>

        <Text style={
                { color: selectTextTheme, 
                fontSize: 17, 
                fontWeight: 'bold', 
                padding: 10}}>
          {t('Config-subtitle-1')}
        </Text>
        <View style={{alignItems: 'center', width: '100%'}}>
          
          <View style={
                  { borderWidth: 1, 
                    borderRadius: 5, 
                    borderColor: selectTextTheme, 
                    width: 350,
                  }}>
            <View 
                style={{
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  padding: 10,
                  borderRadius: 10,
                  borderColor: selectTextTheme,
                  height: 50
                }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Feather name="moon" size={22} color={selectTextTheme} />
                  <Text style={{color: selectTextTheme, fontSize: 16}}>
                    {t('Config-row-1')}
                  </Text>
                </View>

                  <View style={{
                    borderWidth: 1,
                    borderRadius: 25,
                    borderColor: selectButtonRadioTheme,
                    position: 'absolute',
                    left: 300
                  }}>

                <Pressable
                  onPress={() => theme !== 'dark' && toggleTheme()}
                >
                  <View style={{
                    height: 15,
                    width: 15,
                    margin: 2,
                    backgroundColor: ButtonRadioTheme,
                    borderRadius: 7.5,
                  }} />
                </Pressable>
                  </View>

              </View>

              <View 
                style={{
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  padding: 10,
                  borderTopWidth: 1,
                  borderColor: selectTextTheme,
                  height: 50

                }}>
                <View style={{ flexDirection: 'row', gap: 10}}>
                  <Feather name="sun" size={22} color={selectTextTheme} />
                  <Text style={{color: selectTextTheme, fontSize: 16}}>
                    {t('Config-row-2')}
                  </Text>
                </View>

                <View style={{
                    borderWidth: 1,
                    borderRadius: 25,
                    borderColor: selectButtonRadioTheme,
                    position: 'absolute',
                    left: 300
                  }}>
                    <Pressable 
                      onPress={() => theme !== 'light' && toggleTheme()}
                      
                    >
                      <View style={{
                        height: 15,
                        width: 15,
                        borderRadius: 7.5,
                        margin: 2,
                        backgroundColor: ButtonRadioTheme2,

                      }} />
                    </Pressable>
                  </View>
              </View>
          </View>
        
          
        </View>

        <Text style={
              { color: selectTextTheme, 
                fontSize: 17, 
                fontWeight: 'bold', 
                padding: 10, 
                top: 10}}>
          {t('Config-subtitle-2')}
        </Text>
        
        <View style={{alignItems: 'center', width: '100%', padding: 5}}>
          <FlatList
            data={Object.keys(languageResources)}
            renderItem={({item}) => (
            <View
                style={
                  { borderWidth: 1, 
                    borderRadius: 5, 
                    borderColor: selectTextTheme, 
                    width: 349, 
                    marginVertical: 5, 
                    flexDirection: 'row', 
                    gap: 220, 
                    justifyContent: 'center', 
                    alignItems: 'center'}}
                >
                <Text style={
                      { color: selectTextTheme, 
                        padding: 10, 
                        fontSize: 17, 
                        textAlign: 'center', 
                        justifyContent: 'center'}}>
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
              <Text style={{
                      color: '#fff', 
                      fontSize: 17}}>
                {t('Config-save')}
              </Text>
            </Button>
        </View>
      </View>
    </View>
    </>
  );
};

export default Setting;
