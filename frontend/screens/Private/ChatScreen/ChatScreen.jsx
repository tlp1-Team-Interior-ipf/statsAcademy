import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Temas } from '../../../utils/selectTheme';
import Markdown from 'react-native-markdown-display';

const ChatScreen = () => {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false); // Indicador de carga
    const scrollViewRef = useRef(null);

    const { BackgroundTheme, InputBackground, UserMessageTheme, BotMessageTheme } = Temas();

    const styles = {
        body: {
          color: '#FFFFFF', // blanco (white)
        },
      };

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (!id) return;
    
                const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/chat/history/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    const formattedMessages = data.data.map((msg) => ({
                        type: msg.sender === 'user' ? 'user' : 'bot',
                        text: msg.message,
                    }));
                    setMessages(formattedMessages);
    
                    // Desplazarse al final después de cargar los mensajes
                    setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 100); // Ajustar el retraso según sea necesario
                } else {
                    const errorText = await response.text();
                    console.error('Error en respuesta del servidor:', errorText);
                    throw new Error('Error en la respuesta del servidor');
                }
            } catch (error) {
                console.error('Error al obtener historial:', error);
            }
        };
    
        fetchChatHistory();
    }, []);
    
    useEffect(() => {
        // Asegurar que el scroll ocurre después de cualquier actualización en los mensajes
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages]);
    
    const handleSendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);
    
        const newMessage = { type: 'user', text: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
    
        try {
            const id = await AsyncStorage.getItem('userId');
            if (!id) return;
    
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/chat/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: input }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta del servidor:', data);
    
                // Desglose del mensaje en animación
                const fullText = data?.data || 'No se recibió respuesta del servidor';
                let currentText = '';
                setMessages((prev) => [...prev, { type: 'bot', text: currentText }]);
    
                fullText.split('').forEach((char, index) => {
                    setTimeout(() => {
                        currentText += char;
                        setMessages((prev) => {
                            const updatedMessages = [...prev];
                            updatedMessages[updatedMessages.length - 1].text = currentText;
                            return updatedMessages;
                        });
                    }, index * 15); // Tiempo entre cada letra (50ms por defecto)
                });
            } else {
                console.error('Error al enviar mensaje:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);
    

    return (
        <View style={{ flex: 1, backgroundColor: BackgroundTheme }}>
            <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>

                {messages.map((message, index) => (
                    <View
                        key={index}
                        style={{
                            backgroundColor: message.type === 'user' ? UserMessageTheme : BotMessageTheme,
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 10,
                            alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '80%',
                        }}
                    >
                        <Markdown style={styles}>{message.text}</Markdown>
                    </View>
                ))}

                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 7 }}>
                <TextInput
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        backgroundColor: InputBackground,
                        color: '#ddd',
                        borderColor: '#ddd',
                        height: 45,
                    }}
                    value={input}
                    onChangeText={setInput}
                    placeholder={t('Write')}
                    placeholderTextColor="#aaa"
                />
                <Ionicons name="send" size={24} color="#ddd" onPress={handleSendMessage} />
            </View>
        </View>
    );
};

export default ChatScreen;

