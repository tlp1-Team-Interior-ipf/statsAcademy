import { AntDesign } from "@expo/vector-icons"
import { router, Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import {useTranslation} from 'react-i18next';

const Notifications = () => {
  const {t} = useTranslation();

    return(
        <View style={{ height: '100%', backgroundColor: '#10132F' }}>
            <Stack.Screen options={{
                title: t('Notificacions'),
                headerShown: true,
                headerBackTitleVisible: true,
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#10132F' },
                headerLeft: () => (
                    <AntDesign name='arrowleft' onPress={() => router.push('explore')} size={22} color={'#ddd'} style={{ paddingLeft: 10 }} />
                ),
            }} />
            <ScrollView>
                    <Text style={{textAlign: 'center', color: '#ddd'}}>{t('Notifications-void')}</Text>
            </ScrollView>
        </View>
    )
}

export default Notifications;
