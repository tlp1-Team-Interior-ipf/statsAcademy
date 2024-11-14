import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchEvents = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = useCallback(() => {
        const fn = async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch('http://192.168.0.123:4000/calendarEvent/', {
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

    useEffect(() => {
        fetchEvents()
    }, [])


    return { events, setEvents };
};

export default useFetchEvents;
