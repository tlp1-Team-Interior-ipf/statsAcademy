// import React from 'react';
// import { View, Text } from 'react-native';
// import { Temas } from '../../../utils/selectTheme';

// const ChatScreen = () => {
//   const { BackgroundTheme, TextBackgroundTheme } = Temas();

//   return (
//     <View style={
//       { height: '100%', 
//         backgroundColor: BackgroundTheme, 
//         paddingTop: 30
//       }}>
//       <Text style={{color: TextBackgroundTheme}}>Welcome to Chat Screen!</Text>
//     </View>
//   );
// };

// export default ChatScreen;


import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput, View, Text } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Temas } from '../../../utils/selectTheme';

const ChatScreen = () => {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef(null);

    const { BackgroundTheme, InputBackground, UserMessageTheme, BotMessageTheme } = Temas();
    useEffect(() => {
      const fetchChatHistory = async () => {
        try {
            const id = await AsyncStorage.getItem('userId');
            if (!id) return;
    
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/history/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                const data = await response.json();
                const formattedMessages = data.map((msg) => ({
                    type: msg.sender === 'user' ? 'user' : 'bot',
                    text: msg.message,
                }));
                setMessages(formattedMessages);
            } else {
                const errorText = await response.text();
                console.error('Error en respuesta del servidor:', errorText);
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error al obtener el historial del chat:', error);
        }
    };
    
        fetchChatHistory();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };


    const handleSubmit = async () => {
      if (input.trim() === '') return;
  
      setMessages([...messages, { type: 'user', text: input }]);
      setInput('');
  
      try {
          const id = await AsyncStorage.getItem('userId');
          if (!id) return;
  
          const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/chat/${id}`, { 
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question: input}),
          });
  
          if (!response.ok) {
              throw new Error(`Error de servidor: ${response.status}`);
          }
  
          const data = await response.json();
          console.log(data.data);
          if (data?.data) {
              setMessages((prevMessages) => [
                  ...prevMessages,
                  { type: 'bot', text: data.data },
              ]);
          } else {
              setMessages((prevMessages) => [
                  ...prevMessages,
                  { type: 'bot', text: 'No se recibió respuesta del servidor' },
              ]);
          }
      } catch (error) {
          console.error('Error en la petición:', error);
          setMessages((prevMessages) => [
              ...prevMessages,
              { type: 'bot', text: 'Ocurrió un error al enviar la solicitud.' },
          ]);
      }
  };

  
  
    return (
        <View style={{ flex: 1, backgroundColor: BackgroundTheme }}>
           
            <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>
                    {messages.map((message, index) => (
                        
                        <Text
                            key={index}
                            style={{
                                color: message.type === 'user' ? '#ddd' : '#ddd' ,
                                backgroundColor: message.type === 'user' ? UserMessageTheme : BotMessageTheme ,
                                fontSize: 17,
                                width: message.type === 'user' ? 300 : 300,
                                padding: 10,
                                borderRadius: 5,
                                marginBottom: 10,
                                alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                            }}
                        >
                            {message.text}
                        </Text>
                    ))}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        backgroundColor: InputBackground,
                        borderColor: '#ddd',
                        color: '#ddd',
                        flex: 1,
                        marginRight: 10,
                        height: 45
                    }}
                    value={input}
                    onChangeText={setInput}
                    placeholder={t('Write')}
                    placeholderTextColor='#ddd'
                />
                <Ionicons
                    name='send'
                    size={24}
                    color='#ddd'
                    onPress={handleSubmit}
                />
            </View>
        </View>
    );
};

export default ChatScreen;
