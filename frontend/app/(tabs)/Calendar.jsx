import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';
import CreatorEvent from '../../components/CreatorEvent';
import EventItem from '../../components/EventItem';
import useFetchEvents from '../../hooks/eventsFetch';
import '../../components/CalendarLocalConfig'

const Calendario = () => {
    const [selected, setSelected] = useState('');
    const [showCreatorEvent, setShowCreatorEvent] = useState(false);
    const { events, setEvents } = useFetchEvents();
 
    return (
        <>
            <Stack.Screen options={{
                title: 'Calendario de usuario',
                headerShown: true,
                headerBackTitleVisible: true,
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#10132F' },
                headerLeft: () => (
                    <AntDesign name='arrowleft' onPress={() => router.push('explore')} size={22} color={'#ddd'} style={{ paddingLeft: 20 }} />
                ),
            }} />
            <View style={{ backgroundColor: '#10132F', height: '100%' }}>
                <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                        setShowCreatorEvent(true);
                    }}
                    current={new Date().toISOString().split('T')[0]}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, selectedColor: '#36f' }
                    }}
                    theme={{
                        arrowColor: '#fff',
                        dayTextColor: '#fff',
                        monthTextColor: '#fff',
                        textSectionTitleColor: '#fff',
                        calendarBackground: '#225',
                    }}
                />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, textAlign: 'center', margin: 10 }}>
                        Eventos importantes
                    </Text>
                    <Pressable style={{ borderWidth: 1, borderRadius: 5, padding: 10, borderColor: '#ddd', margin: 'auto', width: '50%', alignItems: 'center' }} onPress={() => setShowCreatorEvent(true)} android_ripple={{ color: 'rgba(0, 255, 255, 0.2)', borderless: false, radius: 150 }}>
                        <Text style={{ color: '#ddd' }}>Añadir evento importante</Text>
                    </Pressable>
                    <View style={{ height: 300, width: 310, top: 10, margin: 'auto', left: 10 }}>
                        {events.length === 0 ? (
                            <View style={{ margin: 'auto', justifyContent: 'center', backgroundColor: '#10132F', height: 300, alignItems: 'center', left:-10 }}>
                                <Text style={{ color: '#ddd' }}>No hay eventos programados</Text>
                            </View>
                        ) : (
                            <ScrollView>
                                {events.map(event => <EventItem key={event.id} event={event} handleEditEvent={null} setEvents={setEvents} />)}
                            </ScrollView>
                        )}
                    </View>
                    {showCreatorEvent && (
                        <CreatorEvent
                            selected={selected}
                            setShowCreatorEvent={setShowCreatorEvent}
                            setEvents={setEvents}
                            setSelected={setSelected}
                            addEvent={(newEvent) => {
                                setEvents( prev => [
                                    ...prev, newEvent
                                ])
                            }}
                        />
                    )}
                </View>
                
            </View>
        </>
    );
};


export default Calendario;
