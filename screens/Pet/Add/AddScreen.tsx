import { TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaskInput from 'react-native-mask-input';
import { AddImages } from './AddImages';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';

import { colors } from '@constants/colors';
import { routes } from '@constants/routes';
import { FloatingDropdown } from '@components/FloatingDropdown';
import { CalendarAge } from './CalendarAge';
import { api } from '@constants/api';
import { getAuthToken } from '@functions/cookies';
import DashedLine from 'react-native-dashed-line';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";

const WilayaList = [
  { label: '1: Item 1', value: '1' },
  { label: '2: Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const RaceList = [
  { label: '1: Item 1', value: '1' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const TypeOffer = [
  { id: 1, text: 'Adoption', fillColor: colors.menu, innerIconStyle:{marginRight: 0, marginLeft: 0} ,textStyle: {textDecorationLine: 'none'}, style:{flexDirection: 'column', alignItem: 'center'}},
  { id: 2, text: 'Sale', fillColor: colors.menu, innerIconStyle:{marginRight: 0, marginLeft: 0} ,textStyle: {textDecorationLine: 'none'}, style:{flexDirection: 'column', alignItem: 'center'}},
  { id: 3, text: 'Rent', fillColor: colors.menu, innerIconStyle:{marginRight: 0, marginLeft: 0} ,textStyle: {textDecorationLine: 'none'}, style:{flexDirection: 'column', alignItem: 'center'}},
]

const GenderList = [
  { id: 1, text: 'Male', fillColor: colors.maleText, innerIconStyle:{marginRight: 0, marginLeft: 0} ,textStyle: {textDecorationLine: 'none'}, style:{flexDirection: 'column', alignItem: 'center'}},
  { id: 2, text: 'Female', fillColor: colors.femaleText, innerIconStyle:{marginRight: 0, marginLeft: 0} ,textStyle: {textDecorationLine: 'none'}, style:{flexDirection: 'column', alignItem: 'center'}},
  { id: 3, text: 'Unknown', fillColor: colors.unkownBackground, innerIconStyle:{marginRight: 0, marginLeft: 0} ,textStyle: {textDecorationLine: 'none'}, style:{flexDirection: 'column', alignItem: 'center'}},
]

export const AddScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [subRace, setSubRace] = useState('');
  
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [date, setDate] = useState('');
  const [age, setAge] = useState('');
  const [images, setImages] = useState('');
  const [price, setPrice] = useState('');
  const [typeOffer, setTypeOffer] = useState(1);

  const [token, setToken] = useState(null);

  useEffect(() => {
    getAuthToken().then(token => setToken(token));
  }, []);

  function AddPet() {
    console.log(typeOffer)
    return 0;
    const data = {name, wilaya, location, gender, race, 
      description, phoneNumber, weight, color, date, images, price, subRace};
    fetch( api.SERVER + api.ADDPET, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
       },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <View>
      <KeyboardAwareScrollView >
        <ScrollView contentContainerStyle={{backgroundColor: colors.background, paddingBottom: 123}}>
          <View style={{marginLeft: 20, marginTop: 20}}>
            <Text style={{ fontSize: 30, fontWeight: "400", color: colors.button, paddingLeft: 10}}>Add new Pet</Text>
          </View>
          <View style={{margin: 20,marginTop: 10, backgroundColor: colors.white, padding: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, marginBottom: 50}}>
            <AddImages onImageSelected={e => setImages(e)} />
            <BouncyCheckboxGroup
              data={GenderList}
              initial={1}
              style={{justifyContent: 'space-around'}}
              onChange={(selectedItem: ICheckboxButton) => {
                setGender(selectedItem.id);
              }}
            />
            <FloatingDropdown select='Race' data={RaceList} onItemSelected={e => setRace(e)} />
            <TextInput label="Sub Race" onChangeText={text => setSubRace(text)} style={styles.inputField} />

            <Separator  title='Details' />
            <BouncyCheckboxGroup
              data={TypeOffer}
              initial={1}
              style={{justifyContent: 'space-around'}}
              onChange={(selectedItem: ICheckboxButton) => {
                setTypeOffer(selectedItem.id);
              }}
            />
            <TextInput label="Price" onChangeText={text => setPrice(text)} keyboardType="numeric" style={styles.inputField} />
            <TextInput label="Description" onChangeText={text => setDescription(text)} maxLength={300} multiline style={styles.inputField} />
            <Text style={{textAlign: 'right'}}>{description.length} / 300</Text>
            <Separator  title='Location' />
            <TextInput label="Location" onChangeText={text => setLocation(text)} style={styles.inputField} />
            <FloatingDropdown select='Wilaya' data={WilayaList} onItemSelected={e => setWilaya(e)} />
            
            <Separator  title='Optional' />
            <CalendarAge onSelectDate={e => setDate(e)} />
            <TextInput label="Name" onChangeText={text => setName(text)} style={styles.inputField} />
            <TextInput label="Colors" onChangeText={text => setColor(text)} style={styles.inputField} />
            <TextInput label="Weight" onChangeText={text => setWeight(text)} style={styles.inputField} />
            <TextInput label="Phone number" onChangeText={text => setPhoneNumber(text)} style={styles.inputField} keyboardType="numeric" render={props => <MaskInput  {...props}mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} />} />

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <TouchableOpacity 
                style={{backgroundColor: colors.button, borderRadius: 5, padding: 12, paddingHorizontal: 30 }}
                onPress={AddPet}
              >
                <Text style={{color: colors.white, textAlign: 'center'}}>Publish</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding: 12, paddingHorizontal: 30}}
              onPress={() => navigation.navigate(routes.PREVIEWPET, {
                description: description, phoneNumber: phoneNumber,
                gender: gender, name: name,
                location: location, wilaya: wilaya,
                race: race, subRace: subRace,
                age: age, date: date,
                weight: weight, color: color,
                typeOffer: typeOffer, price: price,
                images: images

              })} >
                <Text style={{color: colors.menu, textAlign: 'center'}}>Preview</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </ScrollView>
      </KeyboardAwareScrollView>   
    </View>
  )
}

const Separator = ({title}) => {
  return (
    <View style={{marginTop: 10, marginBottom: 17 ,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
      <DashedLine style={{ width: 69 }}/>
      <Text style={{textAlign: 'center', fontSize: 17, fontWeight: '500', color: colors.menu}}>
        {title}
      </Text>
      <DashedLine style={{ width: 69 }}/>
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

