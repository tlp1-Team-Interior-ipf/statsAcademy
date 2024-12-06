import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

const updateStatusTask = (setTasks) => {
    const updateStatus = useCallback(async (taskId, title, description, date, newStatus) => {
        const updatedTask = {
            title,
            description,
            date,
            status: newStatus, // Solo actualizamos el status
        };
        console.log("datos:", updatedTask);

        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/task/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedTask),
            });

            console.log("response: ", response);
            
            if (response.ok) {
                console.log("actualizado: ", newStatus);
                
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, status: newStatus } : task
                    )
                );
            } else {
                console.error('Error al actualizar el estado de la tarea');
            }
        } catch (error) {
            console.error('Error en la petición UPDATE', error);
        }
    }, [setTasks]);

    return updateStatus;
};

export default updateStatusTask;
