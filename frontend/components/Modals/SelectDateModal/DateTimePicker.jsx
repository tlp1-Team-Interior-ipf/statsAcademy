import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View } from 'react-native';

const MyDateTimePicker = ({ date, onChangeDate, setShowDate }) => {
 
  return (
    <>
        <View style={{backgroundColor: '#36f'}}>
        <DateTimePicker
          themeVariant='dark'
          value={date}
          mode="date"
          display={'spinner'}
          onChange={(event, selectedDate) => {
            if(event.type === 'set' && selectedDate) {
              onChangeDate(selectedDate);
            } else {
              setShowDate(false);
            }
          }}
        />
        </View>
    </>
  );
};

export default MyDateTimePicker;
