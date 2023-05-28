import { useState } from "react";
import DatePicker from 'react-native-modern-datepicker';
import { StatusBar } from "@components/StatusBar";

export const TestScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <>
      <DatePicker
        onSelectedChange={date => setSelectedDate(date)}
      />
    </>
  )
}