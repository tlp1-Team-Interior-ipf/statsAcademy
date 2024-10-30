import { router, Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { CardProfile } from "../../components/CardProfile";
import { AntDesign } from "@expo/vector-icons";

const MejoresNotas = () => {

    return(

        <View style={{ backgroundColor: '#10132F', alignItems: 'center', height: '100%' }}>
            <Stack.Screen 
                options={{ 
                    title: 'Mis peores notas', 
                    headerStyle: { 
                        backgroundColor: '#10132F' ,
                    },
                    headerTintColor: '#ddd',
                    headerLeft: () => (
                        <AntDesign name="arrowleft" size={22} color={'#ddd'} onPress={() => router.push('/userProfile')} style={{ paddingLeft: 20 }} />
                    )
                }}
            />
                <View style={{ width: '90%', height: '10%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginVertical: 5, justifyContent: 'center' }}>
                    <Text style={{ color: '#aaa', textAlign: 'center', fontSize: 25 }}>Pregunta...</Text>
                </View>
                <View style={{ width: '90%', height: '10%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginVertical: 5, justifyContent: 'center' }}>
                    <Text style={{ color: '#aaa', textAlign: 'center', fontSize: 25 }}>Respuesta...</Text>
                </View>

            <ScrollView>
                <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                    <CardProfile NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={'Tarea 1'} sizeText={30} sizePaddingText={10} showCounter={true}/>
                    <CardProfile NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={'Tarea 2'} sizeText={30} sizePaddingText={10} showCounter={true}/>
                </View>
                
                <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                    <CardProfile NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={'Tarea 3'} sizeText={30} sizePaddingText={10} showCounter={true}/>
                    <CardProfile NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={'Tarea 4'} sizeText={30} sizePaddingText={10} showCounter={true}/>
                </View>

                <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                    <CardProfile NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={'Tarea 5'} sizeText={30} sizePaddingText={10} showCounter={true}/>
                    <CardProfile NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={'Tarea 6'} sizeText={30} sizePaddingText={10} showCounter={true}/>
                </View>

                <View style={{ flexDirection: 'row', gap: 20, marginVertical: 10 }}>
                    <CardProfile NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={'Tarea 7'} sizeText={30} sizePaddingText={10} showCounter={true}/>
                    <CardProfile NameLibrariIcon={'MaterialCommunityIcons'} nameIcon={'notebook-minus'} sizeIcon={30} textCardProfile={'Tarea 8'} sizeText={30} sizePaddingText={10} showCounter={true}/>
                </View>
            </ScrollView>
        </View>
    )
}

export default MejoresNotas;