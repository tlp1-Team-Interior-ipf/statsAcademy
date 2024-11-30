import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchTasks = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = useCallback(() => {
        const fn = async () => {
            const id = await AsyncStorage.getItem('userId');
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/task/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const taskData = await response.json();
                console.log("llll:", taskData)
                setTasks(taskData.data.length ? taskData.data : []);
            }
        
        }
        fn()
    }, []);

    useEffect(() => {
        fetchTasks()
    }, [])


    return { tasks, setTasks };
};

export default useFetchTasks;

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useState, useCallback, useEffect } from 'react';

//     try {
//         const id = await AsyncStorage.getItem('userId');
//         const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/task/${task.id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ date, description: descriptionTask, title: titleTask }),
//         });

//         if (!response.ok) {
//             throw new Error("Error al editar la tarea");
//         }

//         const data = await response.json();
//         updateTask(data.data); // Actualiza la tarea en la lista principal
//         setShowEditTask(false);
//     } catch (error) {
//         console.error("Error en el servidor:", error);
//     }
// };

// export default useFetchTasks