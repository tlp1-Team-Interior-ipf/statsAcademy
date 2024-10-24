import {Stack, router} from 'expo-router'
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Button, Platform } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import DateTimePickerAndroid from '@react-native-community/datetimepicker'

const Calendario = () => {
    const [selected, setSelected] = useState('');
    const [events, setEvents] = useState('');
    const token = AsyncStorage.getItem('userToken');
    const [showCreatorEvent, setShowCreatorEvent] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);

    LocaleConfig.locales['es'] = {
        monthNames: [
            'Enero', 'Febrero', 'Marzo', 'Abril',
            'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        monthNamesShort: [
            'Ene', 'Feb', 'Mar', 'Abr',
            'May', 'Jun', 'Jul', 'Ago',
            'Sep', 'Oct', 'Nov', 'Dic'
        ],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'],
        today: 'Hoy'
    };
    
    LocaleConfig.defaultLocale = 'es';

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                console.log("Token en el frontend:", token);
                
                const response = await fetch('http://192.168.166.123:3000/calendarEvent', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log("Respuesta:", response.ok);

                if (!response.ok) {
                    throw new Error('Error al obtener los eventos');
                }

                const eventData = await response.json();

                if (eventData.length === 0) {
                    console.log("Uy no tienes eventos, vaciaré tu array.");
                    setEvents([]); 
                } else {
                    
                    if (JSON.stringify(eventData) !== JSON.stringify(events)) {
                        setEvents(eventData);
                        console.log('Eventos obtenidos:', eventData);
                    }
                }


            } catch (error) { }
        };

        fetchEvents();

    }, [token]);

    const onChange = (selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate)
        
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let formatted = `${year}/${month}/${day}`;
        setSelected(formatted)
        
    }


    const CreatorEvent = () => {
        return(
            <>
                <View style={{ borderWidth: 1, borderRadius: 5, padding: 10, backgroundColor: '#222', borderColor: '#ddd', position: 'absolute', alignItems: 'flex-end', justifyContent: 'center', top: 10, width: 250, height: 220, zIndex: 2 }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 34}}>
                        <Text style={{color: '#ddd', fontWeight: 'bold', fontSize: 17 }}>
                            Crea tu evento importante
                        </Text>
                        <Ionicons name='close' size={22} color={'#ddd'} style={{paddingVertical:10}} onPress={() => setShowCreatorEvent(!showCreatorEvent)} />
                    </View>
                    <TextInput placeholder='Escriba su evento importante...' style={{ borderWidth: 1, borderRadius: 5, borderColor: '#ddd', padding: 10, color: '#ddd', width: '100%' }} placeholderTextColor={'#ddd'} />

                        { showDate && (
                            <DateTimePickerAndroid
                            value={date}
                            mode='date'
                            display='spinner'
                            onChange={onChange}
                        />
                        )}
                    <View style={{alignItems: 'center', width: '100%', gap:5, marginVertical: 5, justifyContent: 'flex-start'}}>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 65}}>
                        <Text style={{color: '#ddd', fontSize: 17, borderBottomWidth: 1, borderColor: '#ddd', padding: 5}}>
                            { selected ? `Fecha:  ${selected}`  : 'Seleccione la fecha'}
                        </Text>
                        <Ionicons name='calendar' size={22} color={'#ddd'} style={{paddingVertical:10}} onPress={() => setShowDate(!showDate)} />
                    </View>
                    <Pressable style={{ borderWidth: 1, borderRadius: 5, padding: 10,  borderColor: '#ddd', width: '100%' }} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 150}}>
                        <Text style={{color: '#ddd', textAlign: 'center'}}>
                            Guardar
                        </Text>
                    </Pressable>
                    </View>
                </View>
            </>
        )
    }

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
                        setShowDate(false);
                        setShowCreatorEvent(!showCreatorEvent);
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
                <View  style={{alignItems: 'center'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 22, textAlign: 'center', margin: 10}}>
                            Eventos importantes
                        </Text>

                        <Pressable style={{borderWidth: 1, borderRadius: 5, padding: 10, borderColor: '#ddd', margin: 'auto', width: '50%', alignItems: 'center', zIndex:1}} onPress={() => setShowCreatorEvent(!showCreatorEvent)} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 150}}>
                            <Text style={{color: '#ddd'}}>Añadir evento importante</Text>
                        </Pressable>
                            
                        <View style={{height: 300, width: 300, top: 10, margin: 'auto'}}>
                        
                            {events.length === 0 ? (
                                <View style={{margin: 'auto', justifyContent: 'center', backgroundColor: '#111', height: 350, alignItems: 'center'}}>
                                    <Text style={{color: '#ddd'}}>No hay eventos programados</Text>
                                </View>
                            ):(
                                <ScrollView>
                                    {
                                        events.map((event) => (
                                            <View key={event.id} style={{ height: 80, width: '90%', padding: 17, backgroundColor: '#36f', borderRadius: 5, margin: 5, marginHorizontal: 10, gap: 10 }}>
                                                <Text style={{ color: "#fff" }}>Fecha: {event.date}</Text>
                                                <Text style={{ color: "#fff" }}>Evento: {event.event}</Text>
                                            </View>
                                        ))
                                    }
                                </ScrollView>

                            )}
                        </View>
                            {
                                showCreatorEvent ? (
                                    <CreatorEvent />
                                ) : null
                            }
                </View>
            </View>
        </>
    )

}


export default Calendario;