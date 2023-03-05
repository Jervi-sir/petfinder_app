import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaskInput from 'react-native-mask-input';
import { AddImages } from './AddImages';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';

import { StatusBar } from '../../../components/StatusBar';
import { colors } from '../../../constants/colors';
import { routes } from '../../../constants/routes';
import { FloatingDropdown } from '../../../components/FloatingDropdown';
import { HeaderSearch } from '../../../components/HeaderSearch';
import { CalendarAge } from './CalendarAge';


export const AddScreen = () => {
  const [value, setValue] = useState(null);
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');

  const currentDate = new Date().toJSON().slice(0, 10);
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View>
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
            <CalendarAge />
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
                <TouchableOpacity onPress={() => navigation.navigate(routes.PREVIEWPET)} style={{padding: 12, paddingHorizontal: 30}}>
                  <Text style={{color: colors.menu, textAlign: 'center'}}>Preview</Text>
                </TouchableOpacity>
              </View>
          </View>
          
        </ScrollView>
      </KeyboardAwareScrollView>   
    </View>
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

