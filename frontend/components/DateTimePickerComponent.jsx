import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerComponent = ({ date, onChangeDate, setShowDate }) => {
 
  return (
    <>
        <DateTimePicker
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
    </>
  );
};

export default DateTimePickerComponent;
