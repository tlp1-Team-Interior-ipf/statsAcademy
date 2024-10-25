import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 
};

const EventItem = ({ event, handleEditEvent, handleDeleteEvent }) => {
    return (
        <View style={{ height: 80, width: '90%', padding: 17, backgroundColor: '#36f', borderRadius: 5, margin: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{gap: 5, width: '80%'}}>
                    <Text style={{ color: "#fff", fontWeight: 'bold' }}>Fecha: {formatDate(event.date)}</Text>
                    <Text style={{ color: "#fff" }}>Evento: {event.event}</Text>
                </View>
                <View style={{gap: 5}}>
                    <Pressable onPress={() => handleEditEvent(event)}>
                        <Ionicons name="pencil" size={20} color="#fff" />
                    </Pressable>
                    <Pressable onPress={() => handleDeleteEvent(event.id)}>
                        <Ionicons name="trash" size={20} color="#f00" />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};


export default EventItem;
