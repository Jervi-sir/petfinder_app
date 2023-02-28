import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DatePickerModal } from 'react-native-paper-dates';
import { Button } from 'react-native-paper';
import { useState, useCallback } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { COLORS } from '../../constants';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export const AddScreen = () => {
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('')

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      var strToDate = new Date(params.date);

      console.log(millisecondsToStr(strToDate.getTime()));

    },
    [setOpen, setDate]
  );
  return (
    <SafeAreaView>
      <View style={{}}>
        <View style={{marginBottom: 10}}>
          <TextInput
            style={styles.inputField}
            label="Name"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.5}}>
            <TextInput
              style={styles.inputField}
              label="Race"
            />
          </View>
          <View style={{flex: 0.5}}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.5}}>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
             sdas
            </Button>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{textAlign: 'center'}}>age:  </Text>
          </View>
        </View>
        <DatePickerModal
          locale="fr"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
        <TextInput
          label="Price"
          
        keyboardType="numeric"
        />
        <FloatingLabelInput
          label="Phone"
          value={phone}
          mask="(99)99999-9999"
          keyboardType="numeric"
          onChangeText={value => setPhone(value)}
          animationDuration={200}
        />
      </View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 56,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: '#EBEAEF',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputField: {
    backgroundColor: '#EBEAEF',
  }
});


function millisecondsToStr (milliseconds) {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  function numberEnding (number) {
      return (number > 1) ? 's' : '';
  }

  var temp = Math.floor(milliseconds / 1000);
  var years = Math.floor(temp / 31536000);
  if (years) {
      return years + ' year' + numberEnding(years);
  }
  //TODO: Months! Maybe weeks? 
  var days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
      return days + ' day' + numberEnding(days);
  }
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
      return hours + ' hour' + numberEnding(hours);
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
      return minutes + ' minute' + numberEnding(minutes);
  }
  var seconds = temp % 60;
  if (seconds) {
      return seconds + ' second' + numberEnding(seconds);
  }
  return 'less than a second'; //'just now' //or other string you like;
}
