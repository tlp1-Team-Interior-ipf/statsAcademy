import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import MyDateTimePicker from '../SelectDateModal/DateTimePicker'
import { Temas } from '../../../utils/selectTheme';

const CreatorTask = ({ selected, setShowCreatorTask, setSelected, addTask }) => {
    const {t} = useTranslation();

    const [descriptionTask, setDescriptionTask] = useState('');
    const [titleTask, setTitleTask] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);

    const { ModalCreateEventTheme } = Temas();

    const handleSubmitTask = async () => {
        try {
            const id = await AsyncStorage.getItem('userId');
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/task/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: selected, description: descriptionTask, title: titleTask })
            });


            if (!response.ok) {
                throw new Error("Error al crear la tarea");
            }
            
            const data = await response.json()
            addTask(data.data)
            setDescriptionTask('');
            setTitleTask('');
            setSelected(''); 
            setShowCreatorTask(false);

        } catch (error) {
            console.error("Error en el servidor:", error);
        }
    };

        const handleDateChange = (selectedDate) => {
            if (selectedDate) {
                setDate(selectedDate);
                const day = selectedDate.getDate();
                const month = selectedDate.getMonth() + 1;
                const year = selectedDate.getFullYear();
                const formatted = `${year}/${month}/${day}`;
                setSelected(formatted);
                setShowDate(false);
            } else {
                setShowDate(false);
            }
        }
        
        return (
            <KeyboardAvoidingView>
            <Modal 
                animationType='fade'
                transparent
                >
                    <View 
                    style={{
                        backgroundColor: ModalCreateEventTheme,
                        padding: 20,
                        borderRadius: 10,
                        width: "90%",
                        alignItems: "center",
                        margin: 'auto'
                    }}
                    > 

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 60, marginVertical: 10 }}>
                    <Text style={{ color: '#ddd', fontWeight: 'bold', fontSize: 17, top: -15 }}>
                        {t('Modal-title')}
                    </Text>
                    <Ionicons style={{top: -15}} name='close' size={35} color={'#ddd'} onPress={() => {
                        setShowCreatorTask(false);
                        setDescriptionTask('');
                        setSelected('');
                    }} />
                </View>
                    
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 55 }}>
                    <Pressable onPress={() => setShowDate(!showDate)} android_ripple={{ color: 'rgba(0, 255, 255, 0.2)', borderless: false, radius: 150 }}>
                        <Ionicons name='calendar' size={22} color={'#ddd'} />
                    </Pressable>
                    <Text style={{ color: '#ddd', fontSize: 17, borderBottomWidth: 1, borderColor: '#ddd', padding: 5, width: 190, textAlign: 'center' }}>
                        {selected ? `${t('Event-date')} ${selected}` : `${t('Select-date')}`}
                    </Text>
                </View>

                { showDate && (
                    <MyDateTimePicker 
                        date={date}
                        onChangeDate={handleDateChange}
                        setShowDate={setShowDate}
                    />
                    )
                }

                <TextInput placeholder={t('Input-event')} style={{ borderWidth: 1, borderRadius: 5, borderColor: '#ddd', padding: 10, color: '#ddd', width: '100%', marginVertical: 15 }} placeholderTextColor={'#ddd'} value={titleTask} onChangeText={text => setTitleTask(text)} />
                <TextInput placeholder={'Description'} style={{ borderWidth: 1, borderRadius: 5, borderColor: '#ddd', padding: 10, color: '#ddd', width: '100%', marginBottom: 15 }} placeholderTextColor={'#ddd'} value={descriptionTask} onChangeText={text => setDescriptionTask(text)} />
                <Pressable style={{ borderWidth: 1, borderRadius: 5, padding: 10, borderColor: '#ddd', width: '100%' }} onPress={handleSubmitTask} android_ripple={{ color: 'rgba(0, 255, 255, 0.2)', borderless: false, radius: 150 }}>
                    <Text style={{ color: '#ddd', textAlign: 'center' }}>
                        {t('Button-save')}
                    </Text>
                </Pressable>
                    </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default CreatorTask;

