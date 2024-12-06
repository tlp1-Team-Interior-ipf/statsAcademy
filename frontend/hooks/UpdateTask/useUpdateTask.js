import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

const useUpdateTask = (setTasks) => {
    const updateTask = useCallback(async (taskId, updatedTask) => {
        
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
                console.log("actualizado: ", updatedTask);
                
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, ...updatedTask } : task
                    )
                );
            } else {
                console.error('Error al actualizar la tarea');
            }
        } catch (error) {
            console.error('Error en la petición UPDATE', error);
        }
    }, [setTasks]);

    return updateTask;
};

export default useUpdateTask;
