import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const useFetchEvents = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = useCallback(() => {
        const fn = async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch('http://192.168.235.247:3000/calendarEvent', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const eventData = await response.json();
                setEvents(eventData.length ? eventData : []);
            }
        
        }
        fn()
    }, []);

    useFocusEffect(fetchEvents);

    return { events, setEvents };
};

export default useFetchEvents;
