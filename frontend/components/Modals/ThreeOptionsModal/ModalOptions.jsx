import { View, Modal, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import useDeleteTask from '../../../hooks/UpdateTask/useUpdateTask';
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import { useState } from "react";
import updateStatusTask from "../../../hooks/UpdateTask/updateStatusTask";

export const OpenOptionModal = ({ visible, handleCancelModal, position, task, setTasks }) => {
    const { t } = useTranslation();

    const deleteTask = useDeleteTask(setTasks);
    const [showEditModal, setShowEditModal] = useState(false);
    const updateStatus = updateStatusTask(setTasks); 
    console.log('lbjhb:', task);
    

    return (
        <>
            <Modal visible={visible} transparent animationType="fade">
                <Pressable style={styles.containerModal} onPress={handleCancelModal}>
                    <View
                        style={[
                            styles.modalContent,
                            { position: 'absolute', top: position.y, left: position.x }
                        ]}
                    >
                        {task.status === 'pending'

                        ? <Pressable onPress={() => {
                            updateStatus(
                                task.id,
                                task.title,
                                task.description,
                                task.date,
                                'in progress'
                            );
                            handleCancelModal();
                        }} style={{backgroundColor: '#eee', padding: 5}}>
                        <Text style={styles.TextModalChat}>Iniciar</Text>
                    </Pressable> : 
                    
                    task.status === 'in progress' ? 
                        <Pressable onPress={() => {
                            updateStatus(
                                task.id,
                                task.title,
                                task.description,
                                task.date,
                                'completed'
                            );
                            handleCancelModal();
                        }} style={{backgroundColor: '#eee', padding: 5}}>
                        <Text style={styles.TextModalChat}>Completar</Text>
                    </Pressable> : null }

                        { task.status === 'pending' ?
                        <Pressable onPress={() => {setShowEditModal(true); handleCancelModal()}} style={{backgroundColor: '#eee', padding: 5}}>
                            <Text style={styles.TextModalChat}>Editar</Text>
                        </Pressable> : null }
                    </View>
                </Pressable>
            </Modal>
            {showEditModal && (
                <EditTaskModal
                    task={task}
                    setTasks={setTasks}
                    setShowEditTask={setShowEditModal}
                    
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: "#ffffff",
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 5,
        gap: 5
    },
    TextModalChat: {
        textAlign: "center",
        color: "#000",
        fontSize: 16,
        margin: 5,
        
    },
});
