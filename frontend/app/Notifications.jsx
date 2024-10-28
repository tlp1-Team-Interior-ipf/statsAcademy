import { AntDesign } from "@expo/vector-icons"
import { router, Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"

const Notifications = () => {

    return(
        <View style={{ height: '100%', backgroundColor: '#111' }}>
            <Stack.Screen options={{
                title: '  Notificaciones',
                headerShown: true,
                headerBackTitleVisible: true,
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#111' },
                headerLeft: () => (
                    <AntDesign name='arrowleft' onPress={() => router.push('explore')} size={22} color={'#ddd'} style={{ paddingLeft: 10 }} />
                ),
            }} />
            <ScrollView>
                    <Text style={{textAlign: 'center', color: '#ddd'}}>No hay notifiaciones</Text>
            </ScrollView>
        </View>
    )
}

export default Notifications;