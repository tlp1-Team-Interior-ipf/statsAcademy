import { Calendar } from 'react-native-calendars';
import { useTranslation } from 'react-i18next';
import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Temas } from '../../../utils/selectTheme';
import useFetchEvents from '../../../hooks/useFetchEvents';
import configureCalendarLocale from '../../../utils/CalendarLocaleConfig';
import CreatorEvents from '../../../components/Modals/CreatorEventModal/CreatorEvents';
import EventItem from '../../../components/Lists/EventItem/EventItem';

const CalendarScreen = () => {
  const {t, i18n} = useTranslation();

  const { BackgroundTheme, TextBackgroundTheme } = Temas();

  const [selected, setSelected] = useState('');
  const [showCreatorEvent, setShowCreatorEvent] = useState(false);
  const { events, setEvents } = useFetchEvents();

  const [calendarKey, setCalendarKey] = useState(0);

  useEffect(() => {
    const locale = i18n.language; 
    configureCalendarLocale(locale);

    setCalendarKey(prevKey => prevKey + 1);
  }, [i18n.language]);

  return (
    <View style={
      { height: '100%', 
        backgroundColor: BackgroundTheme, 
        paddingTop: 30
      }}>
        
        <View style={{ backgroundColor: BackgroundTheme, height: '100%' }}>
                <Calendar
                    key={calendarKey}
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
                        calendarBackground: 'transparent',
                    }}
                />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, textAlign: 'center', margin: 10 }}>
                        {t('Tool-calendar-subtitle')}
                    </Text>
                    <Pressable style={{ borderWidth: 1, borderRadius: 5, padding: 10, borderColor: '#ddd', margin: 'auto', width: '50%', alignItems: 'center' }} onPress={() => setShowCreatorEvent(true)} android_ripple={{ color: 'rgba(0, 255, 255, 0.2)', borderless: false, radius: 150 }}>
                        <Text style={{ color: '#ddd' }}>{t('Button-add')}</Text>
                    </Pressable>
                    <View style={{ height: 300, width: 310, top: 10, margin: 'auto', left: 10 }}>
                        {events.length === 0 ? (
                            <View style={{ margin: 'auto', justifyContent: 'center', backgroundColor: BackgroundTheme, height: 300, alignItems: 'center', left:-10 }}>
                                <Text style={{ color: '#ddd' }}>{t('Not-event')}</Text>
                            </View>
                        ) : (
                            <ScrollView>
                                {events.map(event => <EventItem key={event.id} event={event} handleEditEvent={null} setEvents={setEvents} />)}
                            </ScrollView>
                        )}
                    </View>
                    {showCreatorEvent && (
                        <CreatorEvents
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

    </View>
  );
};

export default CalendarScreen;
