import { StyleSheet, Text, View } from "react-native"
import EvilIcons from '@expo/vector-icons/EvilIcons';

export const Success = () => {

    return(
        <>
            <View style={styleSuccess.containerSuccess}>
                <EvilIcons name="check" size={22} color={'#fff'} />
                <Text style={styleSuccess.textSuccess}>
                    ¡Evento creado exitosamente! Salga y entre nuevamente
                </Text>
            </View>
        </>
    )
}

const styleSuccess = StyleSheet.create({

    containerSuccess: {
        width: 200,
        height: 70,
        backgroundColor: '#245',
        flexDirection: 'row',
        position: 'absolute',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        zIndex: 50,
        top: 50,
        left: 25
    },

    textSuccess: {
        color: '#fff',
        textAlign: 'center'
    }
})