import { TextInput } from 'react-native-paper';
import { useEffect, useState, useRef  } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated, Button } from 'react-native';
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
import DashedLine from 'react-native-dashed-line';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import axios from 'axios';
import { GlobalVariable } from '@constants/GlobalVariable';
import { useIsFocused } from '@react-navigation/native';

import LottieView from 'lottie-react-native';
import checkmark1 from '@assets/animations/checkmark1.json';

const TypeOfferList = [
  { id: 1, text: 'Adoption', fillColor: colors.menu,  style: {flexDirection: 'column'}, textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15} },
  { id: 2, text: 'Sale', fillColor: colors.menu,  style: {flexDirection: 'column'}, textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15} },
  { id: 3, text: 'Rent', fillColor: colors.menu,  style: {flexDirection: 'column'}, textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15} },
];

const GenderList = [
  { id: 1, text: 'Male', fillColor: colors.maleText, style: {flexDirection: 'column'},textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15}},
  { id: 2, text: 'Female', fillColor: colors.femaleText, style: {flexDirection: 'column'},textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15}},
  { id: 3, text: 'Unknown', fillColor: colors.unkownBackground, style: {flexDirection: 'column'},textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15}},
];

export const AddScreen = () => {
  const animationRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [wilaya_id, setWilaya] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState(1);
  const [race_id, setRace] = useState('');
  const [subRace, setSubRace] = useState('');

  const [RaceList, setRaceList] = useState([]);
  const [WilayaList, setWilayaList] = useState([]);
  
  const [wilayaName, setWilayaName] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [date, setDate] = useState('');
  const [age, setAge] = useState('');
  const [images, setImages] = useState([]);
  const [imagesUri, setImagesUri] = useState([]);
  
  const [price, setPrice] = useState('');
  const [typeOffer, setTypeOffer] = useState(1);
  useEffect(() => {
    axios.get(api.Server + api.AddPet, {headers:{'Content-Type': 'application/json',Authorization: 'Bearer ' + GlobalVariable.authToken}})
      .then(response => {
        const data = response.data;
        setPhoneNumber(data.phone_number)
        setRaceList(data.races)
        setWilayaList(data.wilaya)
      })
  }, []);

  const handleRefresh = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: routes.ADDPET }],
    });
    
  };
  const [race_idError, setRaceError] = useState(false);
  const [imagesError, setImagesError] = useState(false);
  const [wilayaError, setWilayaError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  let scrollViewRef;
  function AddPet() {
    if(images.length < 1) {scrollViewRef.scrollToPosition(0, 20); return setImagesError(true); }
    if(!race_id)          {scrollViewRef.scrollToPosition(0, 200); return setRaceError(true); }
    if(!wilaya_id)        {scrollViewRef.scrollToPosition(0, 300); return setWilayaError(true); }
    if(!phoneNumber)      { return setPhoneNumberError(true); }

    const data = {images, name, typeOffer, wilaya_id, location, gender, race_id, 
      description, phoneNumber, weight, color, date, price, subRace};

    axios.post( api.Server + api.postPet, data, {headers:{'Content-Type': 'application/json',Authorization: 'Bearer ' + GlobalVariable.authToken}})
      .then(response => {
        console.log(response.data)
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setTimeout(() => {
            handleRefresh();
          }, 100)
        }, 2345);
        
      })
      .catch(error => {
        console.error(error);
      });
  }


  return (
    <View>
      {success ? (
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
          <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: -69}}>
            <LottieView
              ref={animationRef}
              style={{width: 100, height: 100}}
              source={checkmark1}
              autoPlay
              duration={3000}
              loop={false}
              />
          </View>
        </View>
      ) : (<></>)}
      <KeyboardAwareScrollView ref={(ref) => { scrollViewRef = ref }}  extraScrollHeight={69} contentContainerStyle={{paddingBottom: 123}} > 
        <ScrollView >
          <View style={{marginLeft: 20, marginTop: 20}}>
            <Text style={{ fontSize: 30, fontWeight: "400", color: colors.button, paddingLeft: 10}}>Add new Pet</Text>
          </View>
          {/** Card */}
          <View style={{margin: 20,marginTop: 10, backgroundColor: colors.white, padding: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, marginBottom: 50}}>
            {/** Image Selector */}
            <AddImages onImageSelected={e => setImages(e)} onImagesUri={e => setImagesUri(e)} />
            {imagesError ? (<View><Text style={{paddingBottom: 20, color: colors.red, paddingLeft: 20}}>Please select Images 👆</Text></View> ) : ( <></> )}
            <Space top={5} bottom={5} />
            {/** Gender Selector */}
            <BouncyCheckboxGroup
              data={GenderList}
              initial={1}
              style={{justifyContent: 'space-between', paddingHorizontal: 20}}
              onChange={(selectedItem: ICheckboxButton) => {
                setGender(selectedItem.id);
              }}
            />
            <Space top={5} bottom={5} />
            {/** Race Selector */}
            <FloatingDropdown select='Race' required={true} data={RaceList} onItemSelected={e => setRace(e)} />
            {race_idError ? (<View><Text style={{paddingBottom: 20, color: colors.red, paddingLeft: 20}}>Please select Race 👆</Text></View> ) : ( <></> )}
            {/** subRace Selector */}
            {race_id ? (
            <TextInput label="Sub Race" onChangeText={text => setSubRace(text)} style={styles.inputField} />
            ) : (
              <></>
            )}

            <Separator  title='Details' />
            {/** Offer Type selector */}
            <BouncyCheckboxGroup
              data={TypeOfferList}
              initial={1}
              style={{justifyContent: 'space-between', paddingHorizontal: 20}}
              onChange={(selectedItem: ICheckboxButton) => {
                setTypeOffer(selectedItem.id);
              }}
            />
            {/** Price Input */}
            {typeOffer != 1 ? (
              <Animated.View>
                <TextInput label="Price" onChangeText={text => setPrice(text)} keyboardType="numeric" style={styles.inputField} />
              </Animated.View>
            ): (
              <></>
            )}
            <Space top={5} bottom={5} />
            {/** description Selector */}
            <TextInput label="Description" onChangeText={text => setDescription(text)} maxLength={300} multiline style={styles.inputField} />
            <Text style={{textAlign: 'right'}}>{description.length} / 300</Text>

            <Separator  title='Location' />
            {/** Wilaya selector */}
            <FloatingDropdown select='Wilaya' required={true} data={WilayaList} 
              onItemSelected={e => {
                setWilaya(e);
                const itemWithId2 = WilayaList.find(item => item.value === e);
                setWilayaName(itemWithId2.label);
              }} 
            />
            {wilayaError ? (<View><Text style={{paddingBottom: 20, color: colors.red, paddingLeft: 20}}>Please select Wialaya 👆</Text></View> ) : ( <></> )}
            {/** Location Input */}
            {wilaya_id ? (
            <TextInput label="Location" onChangeText={text => setLocation(text)} style={styles.inputField} />
            ) : (
              <></>
            )}
            
            <Separator  title='Optional' />
            {/** Birthday Input */}
            <CalendarAge onSelectDate={e => setDate(e)} />
            {/** Name Input */}
            <TextInput label="Name" onChangeText={text => setName(text)} style={styles.inputField} />
            {/** Color Input */}
            <TextInput label="Colors" onChangeText={text => setColor(text)} style={styles.inputField} />
            {/** Weight Input */}
            <TextInput label="Weight" onChangeText={text => setWeight(text)} style={styles.inputField} />
            {/** Phone number Input */}
            <TextInput value={phoneNumber} label="Phone number *" onChangeText={text => setPhoneNumber(text)} style={styles.inputField} keyboardType="numeric" render={props => <MaskInput  {...props}mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} />} />
            {phoneNumberError ? (<View><Text style={{paddingBottom: 20, color: colors.red, paddingLeft: 20}}>Please select Phone Number 👆</Text></View> ) : ( <></> )}


            <Space top={10} bottom={10} />
            {/** Actions */}
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
                location: location, wilaya: wilayaName,
                race: race_id, subRace: subRace,
                age: age, date: date,
                weight: weight, color: color,
                typeOffer: typeOffer, price: price,
                images: imagesUri

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

const Space = ({top = 0, bottom = 0}) => {
  return (
    <View style={{marginTop: top, marginBottom: bottom}}></View>
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

