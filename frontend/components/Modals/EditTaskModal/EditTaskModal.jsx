import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import MyDateTimePicker from '../SelectDateModal/DateTimePicker';
import { Temas } from '../../../utils/selectTheme';
import useUpdateTask from '../../../hooks/UpdateTask/useUpdateTask';

const EditTaskModal = ({ task, setShowEditTask, setTasks }) => {
    const { t } = useTranslation();

    const updateTask = useUpdateTask(setTasks)

    const [descriptionTask, setDescriptionTask] = useState('');
    const [titleTask, setTitleTask] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);

    const { ModalCreateEventTheme } = Temas();

    useEffect(() => {
        if (task) {
            setDescriptionTask(task.description || '');
            setTitleTask(task.title || '');
            setDate(new Date(task.date) || new Date());
        }
    }, [task]);

    const handleDateChange = (selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
            setShowDate(false);
        } else {
            setShowDate(false);
        }
    };

    return (
        <KeyboardAvoidingView>
            <Modal animationType="fade" transparent>
                <View
                    style={{
                        backgroundColor: ModalCreateEventTheme,
                        padding: 20,
                        borderRadius: 10,
                        width: "90%",
                        alignItems: "center",
                        margin: 'auto',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 110, marginVertical: 10 }}>
                        <Text style={{ color: '#ddd', fontWeight: 'bold', fontSize: 17, top: -15 }}>
                            {t('Edit-task-title')}
                        </Text>
                        <Ionicons
                            style={{ top: -15 }}
                            name="close"
                            size={35}
                            color={'#ddd'}
                            onPress={() => setShowEditTask(false)}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 55 }}>
                        <Pressable
                            onPress={() => setShowDate(!showDate)}
                            android_ripple={{ color: 'rgba(0, 255, 255, 0.2)', borderless: false, radius: 150 }}
                        >
                            <Ionicons name="calendar" size={22} color={'#ddd'} />
                        </Pressable>
                        <Text style={{
                            color: '#ddd',
                            fontSize: 17,
                            borderBottomWidth: 1,
                            borderColor: '#ddd',
                            padding: 5,
                            width: 190,
                            textAlign: 'center',
                        }}>
                            {date ? `${t('Event-date')} ${date.toLocaleDateString()}` : `${t('Select-date')}`}
                        </Text>
                    </View>

                    {showDate && (
                        <MyDateTimePicker date={date} onChangeDate={handleDateChange} setShowDate={setShowDate} />
                    )}

                    <TextInput
                        placeholder={t('Input-event')}
                        style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: '#ddd',
                            padding: 10,
                            color: '#ddd',
                            width: '100%',
                            marginVertical: 15,
                        }}
                        placeholderTextColor={'#ddd'}
                        value={titleTask}
                        onChangeText={text => setTitleTask(text)}
                    />
                    <TextInput
                        placeholder={'Description'}
                        style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: '#ddd',
                            padding: 10,
                            color: '#ddd',
                            width: '100%',
                            marginBottom: 15,
                        }}
                        placeholderTextColor={'#ddd'}
                        value={descriptionTask}
                        onChangeText={text => setDescriptionTask(text)}
                    />
                    <Pressable
                        style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                            borderColor: '#ddd',
                            width: '100%',
                        }}
                        onPress={() => {
                            const updatedTaskData = {
                                date: date.toISOString(),
                                description: descriptionTask,
                                title: titleTask,
                            };
                            updateTask(task.id, updatedTaskData);
                            setShowEditTask(false);
                        }}
                        android_ripple={{ color: 'rgba(0, 255, 255, 0.2)', borderless: false, radius: 150 }}
                    >
                        <Text style={{ color: '#ddd', textAlign: 'center' }}>
                            {t('Button-save')}
                        </Text>
                    </Pressable>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default EditTaskModal;

