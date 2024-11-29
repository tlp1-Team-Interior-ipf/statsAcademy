import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Switch, Pressable } from 'react-native';
import { UserContext } from '../../../context/userContext';
import { Temas } from '../../../utils/selectTheme';
import i18next, { languageResources } from '../../../utils/i18next';
import languagesList from '../../../languages/languagesList.json'
import { ButtonLogout } from '../../../components/Buttons/ButtonsRedirects';
import { IconRight } from '../../../components/Icons/Icons';
import handleShare from '../../../hooks/shareUrl';
import { useNavigation } from '@react-navigation/native';

const ConfigScreen = () => {
  const {t} = useTranslation();

  const { theme, toggleTheme } = useContext(UserContext);

  const navigation = useNavigation();

  const [activeLanguage, setActiveLanguage] = useState(i18next.language);

  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setActiveLanguage(lng);
  };

  const { 
    BackgroundTheme,
    ButtonSaveConfigTheme,
    TextBackgroundTheme,
    ButtonBackgroundRadioThemeOn,
    ButtonBackgroundRadioThemeOff
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
          color:TextBackgroundTheme, 
          fontSize: 20, 
          fontWeight: 'bold', 
          top: -15}}>
          {t('Config-title')}
      </Text>

      <Text style={
        { color: TextBackgroundTheme, 
        fontSize: 17, 
        fontWeight: 'bold', 
        padding: 10}}>
        {t('Config-subtitle-1')}
      </Text>

      <View style={{alignItems: 'center', width: '100%'}}>
        <View style={
          { 
            borderWidth: 1, 
            borderRadius: 5, 
            borderColor: TextBackgroundTheme, 
            width: 350,
          }}>
          <View 
              style={{
                flexDirection: 'row', 
                alignItems: 'center', 
                padding: 10,
                borderRadius: 10,
                borderColor: TextBackgroundTheme,
                height: 50
              }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Feather name="moon" size={22} color={TextBackgroundTheme} />
                <Text style={{color: TextBackgroundTheme, fontSize: 16}}>
                  {t('Config-row-1')}
                </Text>
              </View>

                <View style={{
                  borderWidth: 1,
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
                borderColor: TextBackgroundTheme,
                height: 50

              }}>
              <View style={{ flexDirection: 'row', gap: 10}}>
                <Feather name="sun" size={22} color={TextBackgroundTheme} />
                <Text style={{color: TextBackgroundTheme, fontSize: 16}}>
                  {t('Config-row-2')}
                </Text>
              </View>

              <View style={{
                  borderWidth: 1,
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
        { color: TextBackgroundTheme, 
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
                    borderColor: TextBackgroundTheme, 
                    width: 349, 
                    marginVertical: 5, 
                    flexDirection: 'row', 
                    gap: 220, 
                    justifyContent: 'center', 
                    alignItems: 'center'}}
                >
                <Text style={
                      { color: TextBackgroundTheme, 
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


      <View style={{gap: 10}}>
      <Pressable 
        onPress={handleShare}
        style={{alignItems: 'center', width: '100%'}}
        android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 175}}>
        <View style={
          { borderWidth: 1, 
            borderRadius: 5, 
            borderColor: TextBackgroundTheme, 
            width: 349, 
            height: 50,
            flexDirection: 'row', 
            gap: 155, 
            justifyContent: 'flex-start', 
            alignItems: 'center',
          }}
        >
          <Text style={{color: '#fff', fontSize: 18, left: 10}}>{t('Share')}</Text>
          <View style={{position: 'absolute', left: 307}}>
            <IconRight iconName={'right'} iconSize={22} iconColor={'#fff'} />
          </View>
        </View>
      </Pressable>

        <Pressable 
          onPress={() => navigation.navigate('HelpScreen')}
          style={{alignItems: 'center', width: '100%'}}
          android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 175}}>
          <View style={
            { borderWidth: 1, 
              borderRadius: 5, 
              borderColor: TextBackgroundTheme, 
              width: 349, 
              height: 50,
              flexDirection: 'row', 
              gap: 275, 
              justifyContent: 'flex-start', 
              alignItems: 'center',
            }}
          >
            <Text style={{color: '#fff', fontSize: 18, left: 10}}>{t('Help')}</Text>
            <View style={{position: 'absolute', left: 306}}>
              <IconRight iconName={'right'} iconSize={22} iconColor={'#fff'} />
            </View>

          </View>
        </Pressable>
      </View>

      <View style={{marginVertical: 10}}>
        <ButtonLogout />
      </View>

    </View>
  );
};

export default ConfigScreen;
