import { ScrollView, TextInput, View } from 'react-native'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

const Chat = () => {

    return(
        <>
            <View style={{backgroundColor: '#111'}}>
                <Stack.Screen options={{headerShown: false}} />
                <ScrollView>
                    <View style={{backgroundColor: '#111', height: 750}}>

                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput style={{borderWidth: 1, borderRadius: 5, padding: 10, margin: 10, backgroundColor: '#222', borderColor: '#ddd', width: '80%', color: '#ddd'}} />
                        <Ionicons name='send' size={22} color={'#ddd'} style={{margin: 10}} />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default Chat