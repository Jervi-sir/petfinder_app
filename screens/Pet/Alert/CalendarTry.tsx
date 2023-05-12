import { useState } from "react";
import { Animated, View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from "react-native";

export const CalendarTry = () => {
  const [age, setAge] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const toggleCollapsibleView = () => {

  }
  
  return (
    <>
     <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <View style={{flex: 0.5}}>
          <TouchableOpacity onPress={toggleCollapsibleView} style={styles.inputDate}>
            <Text>{selectedDate == '' ? 'Birthday' : selectedDate}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={{textAlign: 'center'}}>Age: {age} </Text>
        </View>
      </View>
    </>
  )
}