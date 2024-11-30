import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { AntDesign, Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons';
// import useDeleteEvent from '../../../hooks/useDeleteEvent'
import { OpenOptionModal } from '../../Modals/ThreeOptionsModal/ModalOptions';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 
};



const TaskItem = ({ task, handleEditTasks, setTasks }) => {
    const [openModal, setOpenModal] = useState(false)
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    const showModalOptions = (task) => {
        // setOpenModal(true);
        task.target.measure((fx, fy, width, height, px, py) => {
            setModalPosition({ x: px, y: py + height });
        });
        setOpenModal(true);
    }

    const StatusTask = () => {
        if(task.status === 'pending')
            return(
                <Entypo name='warning' size={20} color={'#fb0'} style={{position: 'absolute', left: 155}} />
            )
    }

    const closeModal = () => {
        setOpenModal(false);
    };
    // const deleteEvent = useDeleteEvent(setEvents);
    return (
        <View style={{ height: 110, width: '100%', padding: 17, backgroundColor: '#22a', borderRadius: 5, margin: 'auto', borderTopWidth: 6, borderColor: '#56a', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{gap: 5, width: '80%'}}>
                    <View style={{gap: 15, flexDirection: 'row', alignItems: 'center', top: -10}}>
                        <Text style={{ color: "#fff", fontWeight: 'bold' }}>Fecha: {formatDate(task.date)}</Text>
                        <StatusTask />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{ color: "#fff", fontWeight: 'bold' }}>Titulo: </Text>
                        <Text style={{ color: "#fff", width: 107 }} numberOfLines={1} ellipsizeMode='tail'>{task.title}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{ color: "#fff", fontWeight: 'bold'}}>Descripcion: </Text>
                        <Text style={{ color: "#fff", width: 80}} numberOfLines={1} ellipsizeMode='tail'>{task.description}</Text>
                    </View>

                </View>
                <View style={{gap: 15, justifyContent: 'center', top: 10}}>
                    <Pressable onPress={() => handleEditEvent(task)} style={{position: 'absolute', top: -40, left: -165}}>
                        <Entypo name="pin" size={22} color="#fff" />
                    </Pressable>
                    <Pressable onPress={showModalOptions} style={{top: 10, left: 0}}>
                        <Entypo name="dots-three-vertical" size={20} color="#fff" />
                    </Pressable>
                </View>
            </View>
            <OpenOptionModal visible={openModal} handleCancelModal={closeModal} position={modalPosition} />
        </View>
    );
};


export default TaskItem;

