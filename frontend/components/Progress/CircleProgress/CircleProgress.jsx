import { StyleSheet, View , Text} from "react-native"
import Svg, { Circle } from 'react-native-svg'

const MyCircleProgress = ({correct, total}) => {

    const radius = 45; // Radio del círculo
    const strokeWidth = 10; // Ancho del borde
    const circumference = 2 * Math.PI * radius; // Circunferencia
    const progress = (correct / total) * circumference;
    const textProgress = (correct / total) * 100;
    const IntTextProgress = parseInt(textProgress);
    
    return (
        <>
            <View style={stylesCircle.containerCircle}>

                <Svg height={100} width={100}>

                    <Circle
                        cx={50}
                        cy={50}
                        r={radius}
                        stroke={'#999'}
                        strokeWidth={strokeWidth}
                        fill='none'
                    />

                    <Circle 
                        cx={50}
                        cy={50}
                        r={radius}
                        stroke={'#36f'}
                        strokeWidth={strokeWidth}
                        fill={'none'}
                        strokeDasharray={`${progress}, ${circumference}`}
                        strokeLinecap="round"
                        rotation={75}
                        origin={'50, 50'}
                    />

                </Svg>

                    <Text style={stylesCircle.textBarProgress}>
                        {IntTextProgress}%
                    </Text>
            </View>
        </>
    )
}

const stylesCircle = StyleSheet.create({

    containerCircle: {
        width: 100,
        height: 100,
        zIndex: 1,
        top: -50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    fullCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#99999950", // Fondo gris
        left: 30,
        top: 30
    },

    progressCount: {
        borderColor: '#36f',
        borderWidth: 5,
        borderRadius: 50,
        width: 100,
        // height: 49,
    },

    textBarProgress: {
        position: 'absolute', 
        fontSize: 25, 
        color: '#ddd'
    }
})

export default MyCircleProgress