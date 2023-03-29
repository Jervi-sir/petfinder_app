import { useState } from "react";
import { Animated, View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from "react-native";
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
import { colors } from "@constants/colors";
import { calculateAge } from "@functions/helpers";

export const CalendarAge = ({ defaultDate = '', defaultAge = '', onSelectDate }) => {
  const [age, setAge] = useState(defaultAge);
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapsibleView = () => {
    setIsExpanded(!isExpanded);
    const animationConfig = {
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    };
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: animationConfig.duration,
      useNativeDriver: false,
    }).start(() => {
      // Run LayoutAnimation after animation completes
      LayoutAnimation.configureNext(animationConfig.update);
    });
  };

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity onPress={toggleCollapsibleView} style={styles.inputDate}>
            <Text>{selectedDate == '' ? 'Birthday' : selectedDate}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.5 }}>
          <Text style={{ textAlign: 'center' }}>Age: {age} </Text>
        </View>
      </View>
      <Animated.View
        style={{
          overflow: 'hidden',
          height: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 333],
          }),
        }}
      >
        <DatePicker
          options={{
            backgroundColor: colors.background,
            textHeaderColor: colors.menu,
            textDefaultColor: colors.black,
            selectedTextColor: colors.white,
            mainColor: colors.menu,
            textSecondaryColor: colors.black,
            borderColor: colors.background,
          }}
          maximumDate={getToday()}
          onSelectedChange={date => {
            setSelectedDate(date)
            setAge(calculateAge(date))
            onSelectDate(date)
          }}
          selected={defaultDate != '' ? defaultDate : ''}
          mode="calendar"
          minuteInterval={30}
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />

      </Animated.View>
    </>
  )
}


const styles = StyleSheet.create({
  inputField: {
    backgroundColor: colors.background,
    marginBottom: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  inputDate: {
    backgroundColor: colors.background,
    paddingLeft: 20,
    paddingVertical: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }
});


