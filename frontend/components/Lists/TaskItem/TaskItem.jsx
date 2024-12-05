import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { OpenOptionModal } from '../../Modals/ThreeOptionsModal/ModalOptions';
import { Temas } from '../../../utils/selectTheme';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 
};



const TaskItem = ({ task, handleEditTasks, setTasks }) => {
    const { ItemBackground, itemBorder, IconBackground } = Temas();
    const [openModal, setOpenModal] = useState(false)
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    const showModalOptions = (task) => {
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
        else if(task.status === 'in progress')
            return(
                <MaterialIcons name='access-time-filled' size={23} color={IconBackground} style={{position: 'absolute', left: 155}} />
            )
        else if(task.status === 'completed')
            return(
                <Ionicons name='checkmark-circle' size={23} color={'#2f0'} style={{position: 'absolute', left: 155}} />
            )
    }

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <View style={{ height: 110, width: '100%', padding: 17, backgroundColor: ItemBackground, borderRadius: 5, margin: 'auto', borderTopWidth: 6, borderColor: itemBorder, marginTop: 10 }}>
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
                <View style={{justifyContent: 'center', top: 10}}>
                    <Pressable>
                        <Entypo name="pin" size={22} color="#0fa" style={{ left: -165, top: -55 }} />
                    </Pressable>
                    <Pressable onPress={showModalOptions} style={{position: 'absolute', top: 40, left: 0}}>
                        { task.status === 'pending' ? (<Entypo name="dots-three-vertical" size={20} color="#fff" />) : 
                        task.status === 'in progress' ? (<Entypo name="dots-three-vertical" size={20} color="#fff" />) : null }
                    </Pressable>
                </View>
            </View>
            <OpenOptionModal visible={openModal} handleCancelModal={closeModal} position={modalPosition} task={task} setTasks={setTasks} />
        </View>
    );
};


export default TaskItem;

