import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext, useRef } from "react";
import { Image, Text, View, ScrollView, TouchableWithoutFeedback, Alert } from "react-native"
import IdleTimerManager from "react-native-idle-timer";
import { UserContext } from "../../../context/userContext";
import { ProfileCard } from "../../../components/Cards/ProfileCard/ProfileCard";
import {useTranslation} from 'react-i18next';
import { Temas } from "../../../utils/selectTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useIdleTimer from "../../../utils/useIdletTimer";
import useCompletedTopics from "../../../hooks/TopicsCompleteds/useTopicsCompleted";

const ReportsScreen = () => {
  const {t} = useTranslation();

  const { user } = useContext(UserContext);

  const [userId, setUserId] = useState(null);
  const [isUserIdReady, setIsUserIdReady] = useState(false);

  const { resetIdleTimer, elapsedTime, formatTime } = useIdleTimer(() => {
    Alert.alert(t("Inactividad detectada"), t("¿Estás ahí?"));
  });

  
  const { BackgroundTheme } = Temas();
  
  const navigation = useNavigation();
  
  const { completedTopics, error, loading } = useCompletedTopics(userId);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userIdString = await AsyncStorage.getItem('userId');
        console.log("Valor recuperado de AsyncStorage:", userIdString);
        const id = parseInt(userIdString, 10);

        if (!isNaN(id)) {
          setUserId(id);
          setIsUserIdReady(true); // Marca como listo
        } else {
          console.error("ID de usuario inválido:", userIdString);
        }
      } catch (error) {
        console.error("Error al recuperar el ID de usuario:", error.message);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!isUserIdReady || !userId) return;

  }, [isUserIdReady, userId]);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return(
    <>
      <TouchableWithoutFeedback onPress={resetIdleTimer}>
        <View style={{height: '100%', backgroundColor: BackgroundTheme, alignItems: 'center'}}>
          
          <View style={{ marginTop: 25, alignItems: 'center' }}>
            <View style={{width: 100, height: 100, borderWidth: 1, borderColor: '#fff', borderRadius: 50, margin: 10, alignItems: 'center', justifyContent: 'center'}}>
                {user.profileImage ? (
                    <Image source={{uri: user.profileImage}} style={{width: 100, height: 100, borderWidth: 1, borderColor: '#ddd', borderRadius: 50}} />
                ): <Ionicons name="person" size={60} color={'#ddd'} />}
            </View>

            <Text style={{ color: '#fff', paddingVertical: 5, fontSize: 20, fontWeight: 'bold' }}>
              {user.name ? `${user.name}` : `${user.username}`}
            </Text>

            <ScrollView style={{top: 20}}>
              <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                <ProfileCard NameLibrariIcon={'EvilIcons'} nameIcon={'check'} sizeIcon={40} textCardProfile={t('Profile-card-1')} sizeText={22} showCounter={true} counterValue={completedTopics.toString()} onPressEnabled={false} onPress={() => navigation.navigate('userProfile')}/>
                <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'timer-sand-complete'} sizeIcon={30} textCardProfile={t('Profile-card-2')} sizeText={22} showCounter={true} counterValue={formatTime(elapsedTime)} onPressEnabled={false} onPress={() => navigation.navigate('userProfile')}/>
              </View>

              <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                <ProfileCard NameLibrariIcon={'FontAwesome5'} nameIcon={'medal'} sizeIcon={30} textCardProfile={t('Profile-card-3')} sizeText={25} sizePaddingText={10} showCounter={false} onPressEnabled={false} onPress={() => navigation.navigate('userProfile')}/>
                <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Profile-card-4')} sizeText={23} sizePaddingText={10} showCounter={false} onPressEnabled={true} onPress={() => navigation.navigate('TopNotes')}/>
              </View>

              <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                <ProfileCard NameLibrariIcon={'MaterialIcons'} nameIcon={'timeline'} sizeIcon={40} textCardProfile={t('Profile-card-5')} sizeText={22} sizePaddingText={10} showCounter={false}  onPressEnabled={true} onPress={() => navigation.navigate('UserJourney')}/>
                <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={t('Profile-card-6')} sizeText={23} sizePaddingText={10} showCounter={false} onPressEnabled={true} onPress={() => navigation.navigate('BadNotes')}/>
              </View>
            </ScrollView>
          </View>
        
            
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default ReportsScreen;