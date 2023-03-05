import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { useState, useCallback } from 'react';
import { ScrollView, View, Text, Animated, LayoutAnimation } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaskInput from 'react-native-mask-input';
import { FloatingDropdown } from '@components/FloatingDropdown';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HeaderSearch } from '@components/HeaderSearch';
import DatePicker from 'react-native-modern-datepicker';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import moment from 'moment';
import { AddImages } from './AddImages';
import colors from "constants/colors"

export const AddScreen = () => {
  const [value, setValue] = useState(null);
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const currentDate = new Date().toJSON().slice(0, 10);

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
    <SafeAreaView>
      <View>
        <HeaderSearch />
      </View>
      <KeyboardAwareScrollView >
        <ScrollView contentContainerStyle={{backgroundColor: colors.background, paddingBottom: 123}}>
          <View style={{marginLeft: 20, marginTop: 20}}>
            <Text style={{fontSize: 30, fontWeight: "400", color: colors.button, paddingLeft: 10}}>Add new Pet</Text>
          </View>
          <View style={{margin: 20,marginTop: 10, backgroundColor: colors.white, padding: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, marginBottom: 50}}>
            <AddImages />
            
            <TextInput
              style={styles.inputField}
              label="Name"
            />
            <FloatingDropdown />
            <FloatingDropdown />
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
                  setAge(calculateAge(getFormatedDate(date, "YYYY/MM/DD")))
                }}

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

            <TextInput
              label="Price"
              keyboardType="numeric"
              style={styles.inputField}
            />
            <TextInput
              label="Colors"
              style={styles.inputField}
            />
            <TextInput
              label="Weight"
              style={styles.inputField}
            />
            
            <TextInput
              label="Description"
              multiline
              style={styles.inputField}
            />
            <TextInput
                label="Phone number"
                keyboardType="numeric"
                style={styles.inputField}
                render={props =>
                  <MaskInput
                    {...props}
                    mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                  />
                }
              />
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{backgroundColor: colors.button, borderRadius: 5, padding: 12, paddingHorizontal: 30 }}>
                  <Text style={{color: colors.white, textAlign: 'center'}}>Publish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 12, paddingHorizontal: 30}}>
                  <Text style={{color: colors.menu, textAlign: 'center'}}>Preview</Text>
                </TouchableOpacity>
              </View>
          </View>
          
        </ScrollView>
      </KeyboardAwareScrollView>   
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 56,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingLeft: 5,
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

const calculateAge = (date) => {
  let dob;
  let age;

  const dateArray = date.split('/');
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];

  const selectedDate = moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD');
  dob = (selectedDate.format('DD-MM-YYYY'));
  const ageInYears = moment().diff(selectedDate, 'years');
  selectedDate.add(ageInYears, 'years');
  const ageInMonths = moment().diff(selectedDate, 'months');
  selectedDate.add(ageInMonths, 'months');
  const ageInDays = moment().diff(selectedDate, 'days');

  age = (`${ageInYears} years, ${ageInMonths} months, ${ageInDays} days`);

  const stringYears = ageInYears == 0 ? '' : (ageInYears + ' Years, ');
  const stringMonths = ageInMonths == 0 ? '' : (ageInMonths + ' Months, ');
  const stringDays = ageInDays == 0 ? '' : (ageInDays + ' Days');

  return stringYears + stringMonths + stringDays;

};
