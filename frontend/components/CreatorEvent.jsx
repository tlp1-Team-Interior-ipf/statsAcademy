// components/CreatorEvent.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreatorEvent = ({ selected, setShowCreatorEvent, setEvents }) => {
    const [descriptionEvent, setDescriptionEvent] = useState('');
    const [date, setDate] = useState(new Date());


    const handleSubmitEvent = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch("http://192.168.185.247:3000/calendarEvent/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ date: selected, event: descriptionEvent })
            });


            if (!response.ok) throw new Error("Error al crear el evento");
            setDescriptionEvent('');
            setShowCreatorEvent(false);
            // Actualiza la lista de eventos aquí si es necesario
        } catch (error) {
            console.error("Error en el servidor:", error);
        }
    };


    return (
        <KeyboardAvoidingView>
            <View style={{ borderWidth: 1, borderRadius: 5, padding: 10, backgroundColor: '#222', borderColor: '#ddd', position: 'absolute', alignItems: 'flex-end', justifyContent: 'center', width: 250, height: 220, zIndex: 20, top: -400, left: -130 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 34 }}>
                    <Text style={{ color: '#ddd', fontWeight: 'bold', fontSize: 17 }}>
                        Crea tu evento importante
                    </Text>
                    <Ionicons name='close' size={22} color={'#ddd'} onPress={() => setShowCreatorEvent(false)} />
                </View>
                <TextInput placeholder='Escriba su evento importante...' style={{ borderWidth: 1, borderRadius: 5, borderColor: '#ddd', padding: 10, color: '#ddd', width: '100%' }} placeholderTextColor={'#ddd'} value={descriptionEvent} onChangeText={text => setDescriptionEvent(text)} />
                <Pressable style={{ borderWidth: 1, borderRadius: 5, padding: 10, borderColor: '#ddd', width: '100%' }} onPress={handleSubmitEvent}>
                    <Text style={{ color: '#ddd', textAlign: 'center' }}>
                        Guardar
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};


export default CreatorEvent;


