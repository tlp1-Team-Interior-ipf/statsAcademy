import {Stack, router} from 'expo-router'
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';

const Calendario = () => {
    const [selected, setSelected] = useState('');

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
                </View>
            </View>
        </>
    )
}

export default Calendario;