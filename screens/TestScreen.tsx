import { useState } from "react";
import DatePicker from 'react-native-modern-datepicker';
import { StatusBar } from "@components/StatusBar";

export const TestScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <>
      <StatusBar />
      <DatePicker
        onSelectedChange={date => setSelectedDate(date)}
      />
    </>
  )
}