// components/EventItem.js
import React from 'react';
import { View, Text } from 'react-native';


const EventItem = ({ event }) => {
    return (
        <View style={{ height: 80, width: '90%', padding: 17, backgroundColor: '#36f', borderRadius: 5, margin: 5 }}>
            <Text style={{ color: "#fff" }}>Fecha: {event.date}</Text>
            <Text style={{ color: "#fff" }}>Evento: {event.event}</Text>
        </View>
    );
};


export default EventItem;
