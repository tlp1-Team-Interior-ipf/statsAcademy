import { AntDesign } from "@expo/vector-icons"
import { router, Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import {useTranslation} from 'react-i18next';
import { Temas } from "../../utils/selectTheme";

const Notifications = () => {
  const {t} = useTranslation();

  const { BackgroundTheme } = Temas();

    return(
        <View style={{ height: '100%', backgroundColor: BackgroundTheme }}>
            <Stack.Screen options={{
                title: t('Notificacions'),
                headerShown: true,
                headerBackTitleVisible: true,
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: BackgroundTheme },
                headerLeft: () => (
                    <AntDesign name='arrowleft' onPress={() => router.back()} size={22} color={'#ddd'} style={{ paddingLeft: 10 }} />
                ),
            }} />
            <ScrollView>
                    <Text style={{textAlign: 'center', color: '#ddd'}}>{t('Notifications-void')}</Text>
            </ScrollView>
        </View>
    )
}

export default Notifications;
