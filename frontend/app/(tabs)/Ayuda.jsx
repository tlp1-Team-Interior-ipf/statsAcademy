import { useState } from 'react';
import { Text, View } from 'react-native';
import { ButtonList } from '../../components/SocialButtons';
import { router, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const Ayuda = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const questions = [
        {
            question: '¿Qué son los logros?',
            answer: 'Los logros son metas que puedes alcanzar dentro de la aplicación.',
        },
        {
            question: '¿Qué es el recorrido del usuario?',
            answer: 'El recorrido del usuario es el camino que sigue dentro de la app, desde que inicia hasta que termina las tareas.',
        },
        {
            question: '¿Qué pasa si elimino mi cuenta por accidente?',
            answer: 'Si eliminas tu cuenta por accidente, puedes contactar con soporte para intentar recuperarla.',
        },
        {
            question: '¿Cómo cambio mi nombre de usuario o email?',
            answer: 'Puedes cambiar tu nombre de usuario o email desde la configuración de la cuenta.',
        },
        {
            question: '¿Qué pasa si olvido mi contraseña?',
            answer: 'Si olvidas tu contraseña, puedes restablecerla a través de la opción "Olvidé mi contraseña".',
        },
        {
            question: '¿Puedo reiniciar el curso?',
            answer: 'Sí, puedes reiniciar el curso desde la página de inicio.',
        },
        {
            question: '¿Qué es Gauss?',
            answer: 'Gauss es una herramienta de análisis de datos integrada en la aplicación.',
        },
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Ayuda',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#10132F' },
                    headerLeft: () => (
                        <AntDesign
                            name="arrowleft"
                            onPress={() => router.back()}
                            size={22}
                            color={'#ddd'}
                            style={{ paddingLeft: 20 }}
                        />
                    ),
                }}
            />
            <View style={{ backgroundColor: '#10132F', height: '100%' }}>
                <Text
                    style={{
                        color: '#ddd',
                        textAlign: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >
                    Preguntas frecuentes
                </Text>
                {questions.map((item, index) => (
                    <View key={index} style={{ borderWidth: 2, borderRadius: 5, borderColor: '#ddd', margin: 10 }}>
                        <ButtonList
                            content={item.question}
                            direction={'down'}
                            action={() => toggleQuestion(index)}
                            isOpen={openQuestion === index}
                            response={item.answer}
                        />
                        {openQuestion === index && (
                            <View style={{ padding: 10, backgroundColor: '#1a2336', marginTop: 5 }}>
                                <Text style={{ color: '#ddd', fontSize: 14 }}>{item.answer}</Text>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </>
    );
};

export default Ayuda;
