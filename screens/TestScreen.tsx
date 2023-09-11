import { useState } from "react";
import DatePicker from 'react-native-modern-datepicker';
import { StatusBar } from "@components/StatusBar";
import { Text } from "react-native";

export const TestScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <>
      <Text>Bruh</Text>
    </>
  )
}