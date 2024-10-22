// import { router, Stack } from "expo-router"
// import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import  MyStagger  from '@/components/StaggerButtons';
// import { useState } from "react";
// import DraggableFlatList from 'react-native-draggable-flatlist';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// const Kanban = () => {

//     const [tasks, setTasks] = useState({
//         todo: [{ id: 1, text: 'Tarea 1' }, { id: 2, text: 'Tarea 2' }],
//         inProgress: [{ id: 3, text: 'Tarea 3' }],
//         done: [{ id: 4, text: 'Tarea 4' }],
//     });

//     const renderItem = ({ item, drag, isActive }) => {
//         return (
//             <Pressable
//                 onLongPress={drag} // Esto permite iniciar el drag al presionar largo
//                 disabled={isActive} // Evita la interacción mientras el ítem está siendo arrastrado
//                 style={[
//                     styles.taskItem,
//                     { backgroundColor: isActive ? '#ddd' : '#fff' }, // Cambia el color si está activo el arrastre
//                 ]}
//             >
//                 <Text>{item.text}</Text>
//             </Pressable>
//         );
//     };

//     const updateTaskStatus = (taskId, newStatus) => {
//         fetch(`https://api.example.com/tasks/${taskId}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ status: newStatus }),
//         })
//         .then(response => response.json())
//         .then(data => console.log('Tarea actualizada', data))
//         .catch(error => console.error('Error al actualizar la tarea', error));
//     };
    

//     return(
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <View style={{backgroundColor: '#111', height: '100%'}}>
//                 <Stack.Screen 
//                     options={{ 
//                         title: 'Organizador de tareas', 
//                         headerStyle: { 
//                             backgroundColor: '#111' 
//                         },
//                         headerTintColor: '#ddd',
//                         headerLeft: () => (
//                             <AntDesign name="arrowleft" size={22} color={'#ddd'} onPress={() => router.push('explore')} style={{ paddingLeft: 20 }} />
//                         )
//                     }}
//                 />
//                 <Pressable style={stylesKanban.buttonAdd} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 250}}>
//                     <Text style={stylesKanban.textButtonAdd}>Añadir tarea</Text>
//                 </Pressable>
//                 <ScrollView horizontal={true}>
//                     <View style={{ gap: 10, flexDirection: 'row', margin: 10}}>
//                         <View style={{ backgroundColor: '#333', width: 250, height: 650, padding: 20, borderRadius: 5, borderWidth: 1, borderColor: '#666' }}>
//                             <Text style={stylesKanban.textColumn}>Por hacer</Text>
//                             <DraggableFlatList
//                                 data={tasks.todo}
//                                 renderItem={renderItem}
//                                 keyExtractor={(item) => item.id.toString()}
//                                 onDragEnd={({ data }) => setTasks({ ...tasks, todo: data })}
//                             />
//                         </View>
//                         <View style={{ backgroundColor: '#333', width: 250, height: 650, padding: 20, borderRadius: 5, borderWidth: 1, borderColor: '#666' }}>
//                             <Text style={stylesKanban.textColumn}>En proceso</Text>
//                         </View>
//                         <View style={{ backgroundColor: '#333', width: 250, height: 650, padding: 20, borderRadius: 5, borderWidth: 1, borderColor: '#666' }}>
//                             <Text style={stylesKanban.textColumn}>Finalizadas</Text>
//                         </View>
//                     </View>
//                 </ScrollView>
//                 <MyStagger />
//             </View>
//         </GestureHandlerRootView>

//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#111',
//         padding: 10,
//     },
//     header: {
//         fontSize: 20,
//         color: '#fff',
//         marginBottom: 10,
//     },
//     taskItem: {
//         padding: 20,
//         backgroundColor: '#fff',
//         marginVertical: 10,
//         borderRadius: 5,
//     },
// });

// const stylesKanban = StyleSheet.create({
//     buttonAdd: {
//         borderWidth: 1, 
//         borderRadius: 5, 
//         padding: 10, 
//         alignItems: 'center', 
//         borderColor: '#ddd', 
//         margin: 'auto', 
//         width: '90%',
//     },

//     textButtonAdd: {
//         color: '#ddd',
//         fontSize: 19
//     },
    
//     textColumn: {
//         color: '#ddd',
//         fontSize: 20,
//         textAlign: 'center',
//         borderBottomWidth: 1,
//         paddingBottom: 10,
//         borderColor: '#ddd'
//     }
// })
// export default Kanban

// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import React, { useRef, useState } from "react";
// import { View, StyleSheet, PanResponder } from "react-native";

// const DraggableBox = () => {
//     const [position, setPosition] = useState({ x: 0, y: 0 });
//     const panResponder = useRef(
//         PanResponder.create({
//             onStartShouldSetPanResponder: () => true,
//             onPanResponderMove: (evt, gestureState) => {
//                 // Actualiza la posición del cuadro según el movimiento del dedo
//                 setPosition({
//                     x: position.x + gestureState.dx,
//                     y: position.y + gestureState.dy,
//                 });
//             },
//             onPanResponderRelease: () => {
//                 // Resetea el movimiento al soltar (opcional)
//             },
//         })
//     ).current;

//     return (
//         <View style={styles.container}>
//             <View
//                 {...panResponder.panHandlers}
//                 style={[styles.box, { transform: [{ translateX: position.x }, { translateY: position.y }] }]}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#111",
//     },
//     box: {
//         width: 100,
//         height: 100,
//         backgroundColor: "#ff6347",
//         borderRadius: 10,
//     },
// });

// export default DraggableBox;

import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, PanResponder } from "react-native";

const DraggableTask = ({ task, onMove }) => {
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                onMove(task.key, gestureState.dx, gestureState.dy);
            },
            onPanResponderRelease: () => {
                // Lógica al soltar, si es necesaria
            },
        })
    ).current;

    return (
        <View
            {...panResponder.panHandlers}
            style={[styles.task, { transform: [{ translateX: task.x }, { translateY: task.y }] }]}
        >
            <Text>{task.label}</Text>
        </View>
    );
};

const KanbanColumn = ({ title, tasks, onTaskMove }) => (
    <View style={styles.column}>
        <Text style={styles.columnTitle}>{title}</Text>
        {tasks.map((task) => (
            <DraggableTask key={task.key} task={task} onMove={onTaskMove} />
        ))}
    </View>
);

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([
        { key: '1', label: 'Tarea 1', x: 0, y: 0 },
        { key: '2', label: 'Tarea 2', x: 0, y: 0 },
        { key: '3', label: 'Tarea 3', x: 0, y: 0 },
    ]);

    const onTaskMove = (key, dx, dy) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.key === key
                    ? { ...task, x: task.x + dx, y: task.y + dy }
                    : task
            )
        );
    };

    return (
        <View style={styles.container}>
            <KanbanColumn
                title="Por Hacer"
                tasks={tasks.filter(task => task.column === 'Todo')}
                onTaskMove={onTaskMove}
            />
            <KanbanColumn
                title="En Progreso"
                tasks={tasks.filter(task => task.column === 'InProgress')}
                onTaskMove={onTaskMove}
            />
            <KanbanColumn
                title="Hecho"
                tasks={tasks.filter(task => task.column === 'Done')}
                onTaskMove={onTaskMove}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    column: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    columnTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    task: {
        padding: 20,
        backgroundColor: '#ff6347',
        borderRadius: 10,
        marginVertical: 5,
    },
});

export default KanbanBoard;
