import { ScrollView, Text, View } from "react-native"
import {useTranslation} from 'react-i18next';
import { Temas } from "../../../utils/selectTheme";
import { ProfileCard } from "../../../components/Cards/ProfileCard/ProfileCard";

const TopNotesScreen = () => {
    const {t} = useTranslation();

    const { BackgroundTheme } = Temas();

    return(

        <View style={{ backgroundColor: BackgroundTheme, alignItems: 'center', height: '100%' }}>
           
                <View style={{ width: '90%', height: '10%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginVertical: 5, justifyContent: 'center' }}>
                    <Text style={{ color: '#aaa', textAlign: 'center', fontSize: 25 }}>{t('Mejores-notas-question')}</Text>
                </View>
                <View style={{ width: '90%', height: '10%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginVertical: 5, justifyContent: 'center' }}>
                    <Text style={{ color: '#aaa', textAlign: 'center', fontSize: 25 }}>{t('Mejores-notas-answer')}</Text>
                </View>

            <ScrollView>
                <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                    <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Mejores-notas-card')} sizeText={30} sizePaddingText={10} showCounter={true}/>
                    <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Mejores-notas-card')} sizeText={30} sizePaddingText={10} showCounter={true}/>
                </View>
                
                <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                    <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Mejores-notas-card')} sizeText={30} sizePaddingText={10} showCounter={true}/>
                    <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Mejores-notas-card')} sizeText={30} sizePaddingText={10} showCounter={true}/>
                </View>

                <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                    <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Mejores-notas-card')} sizeText={30} sizePaddingText={10} showCounter={true}/>
                    <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Mejores-notas-card')} sizeText={30} sizePaddingText={10} showCounter={true}/>
                </View>

                <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                    <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Mejores-notas-card')} sizeText={30} sizePaddingText={10} showCounter={true}/>
                    <ProfileCard NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-check'} sizeIcon={30} textCardProfile={t('Mejores-notas-card')} sizeText={30} sizePaddingText={10} showCounter={true}/>
                </View>
            </ScrollView>
        </View>
    )
}

export default TopNotesScreen;