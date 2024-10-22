import {Stack, router} from 'expo-router'
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';
import  MyStagger  from '@/components/StaggerButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Calendario = () => {
    const [selected, setSelected] = useState('');
    const [events, setEvents] = useState('');
    const token = AsyncStorage.getItem('userToken');

    const fetchEvents = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                console.log("token en el frontendddd: ", token)
               
    
                const response = await fetch('http://192.168.7.123:3000/calendarEvent', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log("respuesta:", response.ok)
    
                if (!response.ok) {
                    throw new Error('Error al obtener los eventos');
                }
    
                const eventData = await response.json();
                setEvents(eventData);
                console.log('Eventos obtenidos:', eventData);
    
            } catch (error) { }
    }
    
    useEffect(() => {
        fetchEvents();
    }, [token])

    return(
        <>
        <Stack.Screen options={{
          title: 'Calendario de usuario',
          headerShown: true,  
          headerBackTitleVisible: true, 
          headerTintColor: '#fff', 
          headerStyle: {
            backgroundColor: '#111', 
          },
          headerLeft: () => (
            <AntDesign name='arrowleft' onPress={() => router.push('explore')} size={22} color={'#ddd'} style={{paddingLeft: 20}} />
          ),
        }} />
            <View style={{backgroundColor: '#111', height:'100%'}}>
                <View style={{backgroundColor: '#222', color: '#222'}}>

                    <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    current={new Date().toISOString().split('T')[0]}
                    markedDates={{
                        [selected]: {selected: true, disableTouchEvent: true, selectedColor: '#36f'}
                    }}
                    theme={{
                            arrowColor: '#fff', // Color de la flechita para cambiar mes del calendario
                            dayTextColor: '#fff', // Color de los números del calendario
                            monthTextColor: '#fff', // Color del mes con el año [October 2024]
                            // todayTextColor: 'blue', // Color del número del día actual
                            // todayBackgroundColor: '#36f', // Color de fondo del día actual 
                            textSectionTitleColor: '#fff', // Color de día [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
                            calendarBackground: '#111' // Color de fondo del calendario,
                    }}
                />
                </View>
                <View>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 22, textAlign: 'center', margin: 10}}>
                            Eventos importantes
                        </Text>

                        <Pressable style={{borderWidth: 1, borderRadius: 5, padding: 10, borderColor: '#ddd', margin: 'auto', width: '50%', alignItems: 'center'}}>
                            <Text style={{color: '#ddd'}}>Añadir evento importante</Text>
                        </Pressable>

                        <ScrollView style={{height: 300, top: 10}}>
                            {events.length === 0 ? (
                                <View style={{margin: 'auto', justifyContent: 'center', backgroundColor: '#111', height: 350}}>
                                    <Text style={{color: '#ddd'}}>No hay eventos programados</Text>
                                </View>
                            ):(
                                events.map((event) => (
                                    <ScrollView>
                                        <View key={event.id} style={{ padding: 17, backgroundColor: '#36f', borderRadius: 5, margin: 5, marginHorizontal: 10, gap: 10 }}>
                                        <Text style={{ color: "#fff" }}>Evento: {event.event}</Text>
                                        <Text style={{ color: "#fff" }}>Fecha: {event.date}</Text>
                                    </View>
                                    </ScrollView>
                                ))
                            )}
                        </ScrollView>
                </View>
            </View>
            <MyStagger />
        </>
    )
}

export default Calendario;