import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchEvents = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = useCallback(() => {
        const fn = async () => {
            const id = await AsyncStorage.getItem('userId');
            const response = await fetch(`${EXPO_PUBLIC_HOST}/calendarEvent/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const eventData = await response.json();
                console.log(eventData.data)
                setEvents(eventData.data.length ? eventData.data : []);
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
