import { ScrollView, TextInput, View } from 'react-native'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([])
    const scrollViewRef = useRef(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
          try {
            const response = await fetch('http://localhost:3000/chat-history', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              const formattedMessages = data.map((msg) => ({
                type: msg.sender === 'user' ? 'user' : 'bot',
                text: msg.message,
              }));
              setMessages(formattedMessages);
            } else {
              throw new Error('Error al recuperar el historial del chat');
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
        scrollViewRef.current?.scrollToEnd({ animated: true })
      };

    const handleSubmit = async () => {
        if (input.trim() === '') return;
    
        setMessages([...messages, { type: 'user', text: input }]);
        setInput('');
    
        try {
          const token = AsyncStorage.getItem('userToken')
          const userId = AsyncStorage.getItem('userId')

          const response = await fetch('http://localhost:3000/ask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: input, userId: userId })
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { type: 'bot', text: data.response }
            ]);
          } else {
            throw new Error('Error en la respuesta');
          }
        } catch (error) {
          console.error('Error en la petición:', error);

          setMessages((prevMessages) => [
            ...prevMessages, 
            {   type: 'bot', 
                text: 'Ocurrió un error'
            },
          ]);

        }
      };

    return (
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          {messages.map((message, index) => (
            <Text
              key={index}
              style={{
                color: message.type === 'user' ? '#ddd' : '#fff',
                backgroundColor: message.type === 'user' ? '#333' : '#444',
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
            backgroundColor: '#222',
            borderColor: '#ddd',
            color: '#ddd',
            flex: 1,
            marginRight: 10,
          }}
          value={input}
          onChangeText={setInput}
          placeholder='Escribir...'
          placeholderTextColor='#666'
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


export default Chat;
