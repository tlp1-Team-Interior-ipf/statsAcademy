import { AntDesign, Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Switch, Pressable } from 'react-native';
import { UserContext } from '../../../context/userContext';
import { Temas } from '../../../utils/selectTheme';
import i18next, { languageResources } from '../../../utils/i18next';
import languagesList from '../../../languages/languagesList.json'
import { ButtonLogout } from '../../../components/Buttons/ButtonsRedirects';
import { useNavigation } from '@react-navigation/native';
import handleShare from '../../../hooks/ShareFriends/useShareUrl';

const ConfigScreen = () => {
  const {t} = useTranslation();

  const { theme, toggleTheme } = useContext(UserContext);

  const [activeLanguage, setActiveLanguage] = useState(i18next.language);

  const navigation = useNavigation();

  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setActiveLanguage(lng);
  };

  const { 
    BackgroundTheme,
    ButtonBackgroundRadioThemeOn,
    ButtonBackgroundRadioThemeOff,
    TextAndLineTheme,
  } = Temas();
  
  useEffect(() => {
    setActiveLanguage(i18next.language);
  }, []);

  return (
    <View style={
      { height: '100%', 
        backgroundColor: BackgroundTheme, 
        paddingTop: 30
      }}>

      <Text style={
        { textAlign: 'center', 
          color:TextAndLineTheme, 
          fontSize: 20, 
          fontWeight: 'bold', 
          top: -15}}>
          {t('Config-title')}
      </Text>

      <Text style={
        { color: TextAndLineTheme, 
        fontSize: 17, 
        fontWeight: 'bold', 
        padding: 10}}>
        {t('Config-subtitle-1')}
      </Text>

      <View style={{alignItems: 'center', width: '100%'}}>
        <View style={
          { 
            borderWidth: 1,
            borderBottomWidth: 2.7,
            borderLeftWidth: 2,
            backgroundColor: '#3366ff60',
            borderRadius: 5, 
            borderColor: TextAndLineTheme, 
            width: 350,
          }}>
          <View 
              style={{
                flexDirection: 'row', 
                alignItems: 'center', 
                padding: 10,
                borderRadius: 10,
                borderColor: TextAndLineTheme,
                height: 50
              }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Feather name="moon" size={22} color={TextAndLineTheme} />
                <Text style={{color: TextAndLineTheme, fontSize: 21}}>
                  {t('Config-row-1')}
                </Text>
              </View>

                <View style={{
                  borderWidth: 1,
                  borderBottomWidth: 2.7,
                  borderLeftWidth: 2,
                  borderRadius: 25,
                  borderColor: '#ddd',
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
                  backgroundColor: ButtonBackgroundRadioThemeOff,
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
                borderColor: TextAndLineTheme,
                height: 50

              }}>
              <View style={{ flexDirection: 'row', gap: 10}}>
                <Feather name="sun" size={22} color={TextAndLineTheme} />
                <Text style={{color: TextAndLineTheme, fontSize: 20}}>
                  {t('Config-row-2')}
                </Text>
              </View>

              <View style={{
                  borderWidth: 1,
                  borderBottomWidth: 2.7,
                  borderLeftWidth: 2,
                  borderRadius: 25,
                  borderColor: '#ddd',
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
                      backgroundColor: ButtonBackgroundRadioThemeOn,

                    }} />
                  </Pressable>
                </View>
            </View>
        </View>
      </View>

      <Text style={
        { color: TextAndLineTheme, 
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
                    borderBottomWidth: 2.7,
                    borderLeftWidth: 2,
                    backgroundColor: '#3366ff60',
                    borderRadius: 5, 
                    borderColor: TextAndLineTheme, 
                    width: 349, 
                    marginVertical: 5, 
                    flexDirection: 'row', 
                    gap: 220, 
                    justifyContent: 'center', 
                    alignItems: 'center'}}
                >
                <Text style={
                      { color: TextAndLineTheme, 
                        padding: 10, 
                        fontSize: 20, 
                        textAlign: 'center', 
                        justifyContent: 'center'}}>
                {languagesList[item].nativeName}
                </Text>
                <Switch 
                  value={activeLanguage === item}
                  onValueChange={() => changeLng(item)}
                  style={{right: 20}}
                />
            </View>
            )}
            />
      </View>

      <Text style={
        { color: TextAndLineTheme, 
          fontSize: 17, 
          fontWeight: 'bold', 
          padding: 10, 
          top: 10,
          marginTop: -10
          }}>
          {t('Config-subtitle-3')}
      </Text>

      <Pressable
        onPress={() => navigation.navigate('Help')}
        style={
          { borderWidth: 1,
            borderBottomWidth: 2.7,
            borderLeftWidth: 2,
            backgroundColor: '#3366ff60',
            borderRadius: 5, 
            borderColor: TextAndLineTheme, 
            width: 349, 
            marginVertical: 5, 
            flexDirection: 'row', 
            gap: 220, 
            justifyContent: 'flex-start', 
            alignItems: 'center',
            margin: 5,
            padding: 12
          }}
        >
          <Text style={{color: TextAndLineTheme, fontSize: 20}}>{t('Help')}</Text>
          <AntDesign name='right' size={22} color={TextAndLineTheme} style={{position: 'absolute', left: 300}} />
      </Pressable>

      <Pressable
        onPress={() => handleShare()}
        style={
          { borderWidth: 1, 
            borderBottomWidth: 2.7,
            borderLeftWidth: 2,
            backgroundColor: '#3366ff60',
            borderRadius: 5, 
            borderColor: TextAndLineTheme, 
            width: 349, 
            marginVertical: 5, 
            flexDirection: 'row', 
            gap: 220, 
            justifyContent: 'flex-start', 
            alignItems: 'center',
            margin: 5,
            padding: 12
          }}
        >
          <Text style={{color: TextAndLineTheme, fontSize: 20}}>{t('Share')}</Text>
          <AntDesign name='right' size={22} color={TextAndLineTheme} style={{position: 'absolute', left: 300}} />
      </Pressable>

      <ButtonLogout />

    </View>
  );
};

export default ConfigScreen;
