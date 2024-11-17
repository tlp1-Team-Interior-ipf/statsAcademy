import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDeleteEvent = (setEvents) => {
    const deleteEvent = useCallback(async (eventId) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/calendarEvent/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
            } else {
                console.error('Error al eliminar el evento');
            }
        } catch (error) {
            console.error('Error en la petición DELETE', error);
        }
    }, [setEvents]);

    return deleteEvent;
};

export default useDeleteEvent;
