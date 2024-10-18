import { router, Stack } from "expo-router"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"

const Kanban = () => {

    return(
        <View style={{backgroundColor: '#111', height: '100%'}}>
            <Stack.Screen 
                options={{ 
                    title: 'Organizador de tareas', 
                    headerStyle: { 
                        backgroundColor: '#111' 
                    },
                    headerTintColor: '#ddd',
                    headerLeft: () => (
                        <AntDesign name="arrowleft" size={22} color={'#ddd'} onPress={() => router.push('explore')} style={{ paddingLeft: 20 }} />
                    )
                }}
            />
            <Pressable style={stylesKanban.buttonAdd} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 250}}>
                <Text style={stylesKanban.textButtonAdd}>Añadir tarea</Text>
            </Pressable>
            <ScrollView horizontal={true}>
                <View style={{ gap: 10, flexDirection: 'row', margin: 10}}>
                    <View style={{ backgroundColor: '#333', width: 250, height: 650, padding: 20, borderRadius: 5, borderWidth: 1, borderColor: '#666' }}>
                        <Text style={stylesKanban.textColumn}>Por hacer</Text>
                    </View>
                    <View style={{ backgroundColor: '#333', width: 250, height: 650, padding: 20, borderRadius: 5, borderWidth: 1, borderColor: '#666' }}>
                        <Text style={stylesKanban.textColumn}>En proceso</Text>
                    </View>
                    <View style={{ backgroundColor: '#333', width: 250, height: 650, padding: 20, borderRadius: 5, borderWidth: 1, borderColor: '#666' }}>
                        <Text style={stylesKanban.textColumn}>Finalizadas</Text>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}
const stylesKanban = StyleSheet.create({
    buttonAdd: {
        borderWidth: 1, 
        borderRadius: 5, 
        padding: 10, 
        alignItems: 'center', 
        borderColor: '#ddd', 
        margin: 'auto', 
        width: '90%',
    },

    textButtonAdd: {
        color: '#ddd',
        fontSize: 19
    },
    
    textColumn: {
        color: '#ddd',
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#ddd'
    }
})
export default Kanban