import { StyleSheet, View } from 'react-native'
import { Entypo } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native'

export const LibraryButton = () => {
    const navigation = useNavigation();

    return(
        <View style={LibraryStyle.containerBook}>
            <Entypo name="book" size={45} color={'#fff'} onPress={() => navigation.navigate('Library')} />
        </View>
    )
}

const LibraryStyle = StyleSheet.create({
    containerBook: {
        backgroundColor: '#cccccc40',
        borderLeftWidth: 2,
        borderBottomWidth: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        position: 'absolute',
        top: 650,
        left: 280,
        padding: 10,
        borderRadius: 50,
    },

})