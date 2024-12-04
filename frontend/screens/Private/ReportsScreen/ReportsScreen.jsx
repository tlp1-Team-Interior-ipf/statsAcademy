import { AntDesign, EvilIcons, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext, useRef } from "react";
import { Image, Text, View, ScrollView, TouchableWithoutFeedback, Alert, Pressable } from "react-native"
import IdleTimerManager from "react-native-idle-timer";
import { UserContext } from "../../../context/userContext";
import { ProfileCard } from "../../../components/Cards/ProfileCard/ProfileCard";
import {useTranslation} from 'react-i18next';
import { Temas } from "../../../utils/selectTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useIdleTimer from "../../../utils/useIdletTimer";
import useCompletedTopics from "../../../hooks/TopicsCompleteds/useTopicsCompleted";
import MyCircleProgress2 from "../../../components/Progress/CircleProgress/CircleProgress2";

const ReportsScreen = () => {
  const {t} = useTranslation();

  const { user } = useContext(UserContext);

  const [userId, setUserId] = useState(null);
  const [isUserIdReady, setIsUserIdReady] = useState(false);

  const { resetIdleTimer, elapsedTime, formatTime } = useIdleTimer(() => {
    Alert.alert(t("Inactividad detectada"), t("¿Estás ahí?"));
  });

  
  const { BackgroundTheme, profileBorderTheme, TextBackgroundTheme } = Temas();
  
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
          <View style={{backgroundColor: '#3366ff50' }}>
            <View style={{ marginTop: 55, alignItems: 'center' }}>
              <View style={{width: 150, height: 150, borderWidth: 1, borderColor: '#fff', borderRadius: 150, margin: 10, alignItems: 'center', justifyContent: 'center'}}>
                  {user.profileImage ? (
                      <Image source={{uri: user.profileImage}} style={{width: 100, height: 100, borderWidth: 1, borderColor: '#ddd', borderRadius: 50}} />
                  ): <Ionicons name="person" size={60} color={'#fff'} />}
              </View>

              <Text style={{ color: '#fff', paddingVertical: 5, fontSize: 20, fontWeight: 'bold' }}>
                {user.name ? `${user.name}` : `${user.username}`}
              </Text>
          </View>

            <ScrollView style={{top: 18, width: 360}}>
              <View>
                <Text style={{color: "#fff", fontSize: 25, fontWeight: 'bold', margin: 10}}>{t('Reports')}</Text>

                {/* <View style={{flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', left: 10, gap: 0}}>
                    <EvilIcons name="check" size={45} color={"#36f"} />
                    <Text style={{fontSize: 20}}>{t('Profile-card-1')}</Text>
                  </View>
                  <Text style={{fontSize: 25, left: 140}}>{completedTopics.toString()}</Text>
                </View>

                <View style={{flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', left: 10, gap: 5}}>
                    <MaterialCommunityIcons name="timer-sand-complete" size={40} color={"#36f"} />
                    <Text style={{fontSize: 20}}>{t('Profile-card-2')}</Text>
                  </View>
                  <Text style={{fontSize: 22, left: 72}}>{formatTime(elapsedTime)}</Text>
                </View> */}
              
                <View style={{flexDirection: 'column', height: 150, backgroundColor: '#ffffff50', alignItems: 'center', paddingLeft: 20, margin: 10, borderRadius: 20, }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{top:60, left: -25}}>
                      <MyCircleProgress2 porcentaje={completedTopics} heightCircle={100} widthCircle={100} />
                    </View>
                    <Text style={{fontSize: 52, left: 5, color: '#fff', top: 10}}>{formatTime(elapsedTime)}</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 20, top: 10}}>
                    <Text style={{fontSize: 25, left: -8, color: '#fff'}}>{t('Progress')}</Text>
                    <Text style={{fontSize: 25, left: 0, color: '#fff'}}>{t('TimeInApplication')}</Text>
                  </View>
                </View>
                <View>

                  <Pressable onPress={() => navigation.navigate('Achievements')} style={{flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', left: 10, gap: 10}}>
                      <FontAwesome5 name="medal" size={35} color={"#36f"} />
                      <Text style={{fontSize: 20}}>{t('Profile-card-3')}</Text>
                    </View>
                    <AntDesign name="right" size={22} color={"#000"} style={{left: 317, position: 'absolute'}} />
                  </Pressable>

                  <Pressable onPress={() => navigation.navigate('TopNotes')} style={{flexDirection: 'row', gap: 20, height: 60, backgroundColor: '#fff', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', left: 10, gap: 10}}>
                      <MaterialCommunityIcons name="notebook-check" size={35} color={"#36f"} />
                      <Text style={{fontSize: 20}}>{t('Profile-card-4')}</Text>
                    </View>
                    <AntDesign name="right" size={22} color={"#000"} style={{left: 316, position: 'absolute'}} />
                  </Pressable>

                  <Pressable onPress={() => navigation.navigate('BadNotes')} style={{flexDirection: 'row', gap: 20, height: 60, backgroundColor: '#fff', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', left: 10, gap: 10}}>
                      <MaterialCommunityIcons name="notebook-minus" size={35} color={"#36f"} />
                      <Text style={{fontSize: 20}}>{t('Profile-card-6')}</Text>
                    </View>
                    <AntDesign name="right" size={22} color={"#000"} style={{left: 315, position: 'absolute'}} />
                  </Pressable>

                  <Pressable onPress={() => navigation.navigate('UserJourney')} style={{flexDirection: 'row', gap: 20, height: 60, backgroundColor: '#fff', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', left: 10, gap: 10}}>
                      <MaterialIcons name="timeline" size={40} color={"#36f"} />
                      <Text style={{fontSize: 20}}>{t('Profile-card-5')}</Text>
                    </View>
                    <AntDesign name="right" size={22} color={"#000"} style={{left: 314, position: 'absolute'}} />
                  </Pressable>

                </View>
              </View>
            </ScrollView>
          </View>
        
            
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default ReportsScreen;