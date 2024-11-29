import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Image, Text, View, ScrollView } from "react-native"
import { UserContext } from "../../../context/userContext";
import { ProfileCard } from "../../../components/Cards/ProfileCard/ProfileCard";
import {useTranslation} from 'react-i18next';
import { Temas } from "../../../utils/selectTheme";

const ReportsScreen = () => {
  const {t} = useTranslation();

  const { user } = useContext(UserContext);

  console.log("usuario?: ", user);
  

  const { BackgroundTheme } = Temas();

  const navigation = useNavigation();
    
  return(
    <>
      <View style={{height: '100%', backgroundColor: BackgroundTheme, alignItems: 'center'}}>
        
        <View style={{ marginTop: 25, alignItems: 'center' }}>
          <View style={{width: 100, height: 100,borderRadius: 50, margin: 10, alignItems: 'center', justifyContent: 'center'}}>
              {user.profileImage ? (
                  <Image source={{uri: user.profileImage}} style={{width: 100, height: 100, borderWidth: 1, borderColor: '#ddd', borderRadius: 50}} />
              ): <Ionicons name="person" size={60} color={'#ddd'} style={{borderWidth: 1, borderRadius: 50, borderColor: '#fff', padding: 15}} />}
          </View>

          <Text style={{ color: '#fff', paddingVertical: 5, fontSize: 20, fontWeight: 'bold' }}>
            {user.name ? `${user.name}` : `${user.username}`}
          </Text>

          <ScrollView style={{top: 20}}>
            <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
              <ProfileCard NameLibrariIcon={'EvilIcons'} nameIcon={'check'} sizeIcon={40} textCardProfile={t('Profile-card-1')} sizeText={22} showCounter={true} onPressEnabled={false} onPress={() => navigation.navigate('userProfile')}/>
              <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'timer-sand-complete'} sizeIcon={30} textCardProfile={t('Profile-card-2')} sizeText={22} showCounter={true} onPressEnabled={false} onPress={() => navigation.navigate('userProfile')}/>
            </View>

            <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
              <ProfileCard NameLibrariIcon={'FontAwesome5'} nameIcon={'medal'} sizeIcon={30} textCardProfile={t('Profile-card-3')} sizeText={23} sizePaddingText={10} showCounter={false} onPressEnabled={false} onPress={() => navigation.navigate('userProfile')}/>
              <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Profile-card-4')} sizeText={23} sizePaddingText={10} showCounter={false} onPressEnabled={true} onPress={() => navigation.navigate('TopNotes')}/>
            </View>

            <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
              <ProfileCard NameLibrariIcon={'MaterialIcons'} nameIcon={'timeline'} sizeIcon={40} textCardProfile={t('Profile-card-5')} sizeText={22} sizePaddingText={10} showCounter={false}  onPressEnabled={false} onPress={() => navigation.navigate('userProfile')}/>
              <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={t('Profile-card-6')} sizeText={23} sizePaddingText={10} showCounter={false} onPressEnabled={true} onPress={() => navigation.navigate('BadNotes')}/>
            </View>
          </ScrollView>
        </View>
      
          
      </View>
    </>
  )
}

export default ReportsScreen;