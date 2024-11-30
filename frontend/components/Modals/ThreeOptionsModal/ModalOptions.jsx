import { View, Modal, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import useDeleteTask from '../../../hooks/UpdateTask/useUpdateTask';
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import { useState } from "react";

export const OpenOptionModal = ({ visible, handleCancelModal, position, task, setTasks }) => {
    const { t } = useTranslation();

    const deleteTask = useDeleteTask(setTasks);
    const [showEditModal, setShowEditModal] = useState(false);

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
                        <Pressable onPress={() => deleteTask(task.id)} style={{backgroundColor: '#eee', padding: 5}}>
                            <Text style={styles.TextModalChat}>En proceso</Text>
                        </Pressable>
                        <Pressable onPress={() => {setShowEditModal(true); handleCancelModal()}} style={{backgroundColor: '#eee', padding: 5}}>
                            <Text style={styles.TextModalChat}>Editar</Text>
                        </Pressable>
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
        borderRadius: 5,
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
