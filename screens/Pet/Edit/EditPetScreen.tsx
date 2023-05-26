import { TextInput } from 'react-native-paper';
import { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaskInput from 'react-native-mask-input';
import { AddImages } from './AddImages';
import { useNavigation } from '@react-navigation/native';
import Dialog from "react-native-dialog";

import { colors } from '@constants/colors';
import { routes } from '@constants/routes';
import { CalendarAge } from './CalendarAge';
import { api } from '@constants/api';
import DashedLine from 'react-native-dashed-line';
import BouncyCheckboxGroup, { ICheckboxButton } from "react-native-bouncy-checkbox-group";
import axios from 'axios';
import { GlobalVariable } from '@constants/GlobalVariable';
import { useIsFocused } from '@react-navigation/native';

import LottieView from 'lottie-react-native';
import checkmark1 from '@assets/animations/checkmark1.json';
import loading1 from '@assets/animations/loading1.json';

import { Dropdown } from 'react-native-element-dropdown';

export const EditPetScreen = ({ route }) => {
  const { petId } = route.params;

  const animationRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skeleton, setSkeleton] = useState(true);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  /*Form data*/
  const [images, setImages] = useState([]);
  const [imagesUri, setImagesUri] = useState([]);
  const [gender, setGender] = useState(1);
  const [race_id, setRace] = useState('');
  const [subRace, setSubRace] = useState('');

  const [typeOffer, setTypeOffer] = useState(1);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [wilaya_id, setWilaya] = useState('');
  const [wilayaName, setWilayaName] = useState('');
  const [location, setLocation] = useState('');

  const [birthday, setBirthday] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isActive, setIsActive] = useState();
  /* from server */
  const [RaceList, setRaceList] = useState([]);
  const [WilayaList, setWilayaList] = useState([]);
  const [SelectedPet, setSelectedPet] = useState([]);

  const [age, setAge] = useState('');

  /* Modals */
  const [archiveVisible, setArchiveVisible] = useState(false);
  const [unArchiveVisible, setUnArchiveVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteVerification, setDeleteVerification] = useState('');
  const deletionVertificationText = 'Mira app';
  /* skeleton */
  const skeletonWidth = new Animated.Value(0);

  Animated.loop(
    Animated.timing(skeletonWidth, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    })
  ).start();
  const loadingColor = 'rgba(51,58,90,0.2)';
  const loadingBackgroundColor = '#F5F5F5';
  const fullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const LessFullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '25%'] });
  const halfFullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '45%'] });
  const closeFullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '69%'] });
  const textAnimation = { width: fullWidthSkeletonAniamtion, height: 10, marginBottom: 7, backgroundColor: loadingColor, borderRadius: 10, };
  const textAnimationLessHalf = { width: LessFullWidthSkeletonAniamtion, height: 10, marginBottom: 7, backgroundColor: loadingColor, borderRadius: 10, };
  const textAnimationHalf = { width: halfFullWidthSkeletonAniamtion, height: 10, marginBottom: 7, backgroundColor: loadingColor, borderRadius: 10, };
  const textAnimationMoreHalf = { width: closeFullWidthSkeletonAniamtion, height: 10, marginBottom: 7, backgroundColor: loadingColor, borderRadius: 10, };
  const imageAnimation = { width: fullWidthSkeletonAniamtion, height: '100%', backgroundColor: loadingColor, borderRadius: 10, };


  useEffect(() => {
    axios.get(api.Server + api.EditPet + petId, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GlobalVariable.authToken } })
      .then(response => {
        const data = response.data;
        setSelectedPet(data.pet);
        setImages(data.pet.images);
        setTypeOffer(data.pet.offer_type_id);
        setRace(data.pet.race_id);
        setSubRace(data.pet.sub_race);
        setWilaya(data.pet.wilaya_id);
        setPrice(data.pet.price);

        setName(data.pet.name);
        setColor(data.pet.color);
        setWeight(data.pet.weight);
        setPhoneNumber(data.pet.phone_number);
        setDescription(data.pet.description);
        setGender(data.pet.gender_id);
        setLocation(data.pet.location);
        setBirthday(data.pet.birthday);
        setIsActive(data.pet.is_active);
        setRaceList(data.races);
        setWilayaList(data.wilaya);

        setSkeleton(false);
      })
  }, []);

  const handleRefresh = () => {
    setImagesUri([]);
    setImages([]);
    navigation.reset({
      index: 0,
      routes: [{ name: routes.SHOWMYPROFILE }],
    });
  };
  const [race_idError, setRaceError] = useState(false);
  const [imagesError, setImagesError] = useState(false);
  const [wilayaError, setWilayaError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  let scrollViewRef;
  function UpdatePet() {
    if (images.length < 1) { scrollViewRef.scrollToPosition(0, 20); return setImagesError(true); }
    if (!race_id) { scrollViewRef.scrollToPosition(0, 200); return setRaceError(true); }
    if (!wilaya_id) { scrollViewRef.scrollToPosition(0, 300); return setWilayaError(true); }
    if (!phoneNumber) { return setPhoneNumberError(true); }

    const data = {
      name, typeOffer, wilaya_id, location, gender, race_id,
      description, phoneNumber, weight, color, birthday, price, subRace, images
    };
    setIsLoading(true);
    axios.post(api.Server + api.updatePet + petId, data, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GlobalVariable.authToken } })
      .then(response => {
        console.log(response.data)
        setIsLoading(false);
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

  const handleCancel = () => {
    setArchiveVisible(false);
    setUnArchiveVisible(false);
    setDeleteVisible(false);

  };

  function archiveThisPet() {
    axios.post(api.Server + api.ArchivePet + petId, '', { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GlobalVariable.authToken } })
      .then(response => {
        setArchiveVisible(false);
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setTimeout(() => {
            handleRefresh();
          }, 50)
        }, 2345);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function unArchiveThisPet() {
    axios.post(api.Server + api.unArchivePet + petId, '', { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GlobalVariable.authToken } })
      .then(response => {
        setUnArchiveVisible(false);
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setTimeout(() => {
            handleRefresh();
          }, 50)
        }, 2345);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function deletePet() {
    axios.post(api.Server + api.deletePet + petId, '', { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GlobalVariable.authToken } })
      .then(response => {
        console.log(response.data);
        setDeleteVisible(false);
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setTimeout(() => {
            handleRefresh();
          }, 50)
        }, 2345);
      })
      .catch(error => {
        console.error(error);
      });
  }


  return (
    <View>
      {success ? (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: -69 }}>
            <LottieView
              ref={animationRef}
              style={{ width: 100, height: 100 }}
              source={checkmark1}
              autoPlay
              duration={3000}
              loop={false}
            />
          </View>
        </View>
      ) : (<></>)}
      {isLoading ? (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: -69, width: 100, height: 100 }}>
            <LottieView
              ref={animationRef}
              style={{ width: 100, height: 100 }}
              source={loading1}
              autoPlay
              loop={true}
            />
          </View>
        </View>
      ) : (<></>)}

      <KeyboardAwareScrollView ref={(ref) => { scrollViewRef = ref }} extraScrollHeight={69} contentContainerStyle={{ paddingBottom: 123 }} >
        <ScrollView >
          <View style={{ marginLeft: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: "400", color: colors.button, paddingLeft: 10 }}>Add new Pet</Text>
          </View>
          {/** Card */}
          <View style={{ margin: 20, marginTop: 10, backgroundColor: colors.white, padding: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, marginBottom: 50 }}>
            {/** Image Selector */}
            {images.length > 0 ? (
              <AddImages imagesFromServer={images} onImageSelected={e => setImages(e)} onImagesUri={e => setImagesUri(e)} />
            ) : (<></>)}
            {imagesError ? (<View><Text style={{ paddingBottom: 20, color: colors.red, paddingLeft: 20 }}>Please select Images 👆</Text></View>) : (<></>)}
            <Space top={5} bottom={5} />

            {/** Gender Selector */}
            {skeleton ? (
              <Animated.View style={textAnimation}></Animated.View>
            ) : (
              <BouncyCheckboxGroup
                data={GlobalVariable.GenderList}
                initial={SelectedPet.gender_id}
                style={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
                onChange={(selectedItem: ICheckboxButton) => {
                  setGender(selectedItem.id);
                }}
              />
            )}
            <Space top={5} bottom={5} />
            {/** Race Selector */}
            {skeleton ? (
              <Animated.View style={textAnimation}></Animated.View>
            ) : (
              <>
                {race_id ? (
                  <DropDownComponent defaultValue={race_id} select='Race' required={true} data={RaceList} onItemSelected={e => setRace(e)} />
                ) : (<></>)}
                {race_idError ? (<View><Text style={{ paddingBottom: 20, color: colors.red, paddingLeft: 20 }}>Please select Race 👆</Text></View>) : (<></>)}
                {/** subRace Selector */}
                {race_id ? (
                  <TextInput label="Sub Race" value={subRace} onChangeText={text => setSubRace(text)} style={styles.inputField} />
                ) : (
                  <></>
                )}
              </>
            )}

            <Separator title='Details' />
            {/** Offer Type selector */}
            {skeleton ? (
              <>
                <Animated.View style={textAnimation}></Animated.View>
                <Animated.View style={textAnimation}></Animated.View>
              </>
            ) : (
              <>
                <BouncyCheckboxGroup
                  data={GlobalVariable.TypeOfferList}
                  initial={SelectedPet.offer_type_id}
                  style={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
                  onChange={(selectedItem: ICheckboxButton) => {
                    setTypeOffer(selectedItem.id);
                  }}
                />
                {typeOffer != 1 ? (
                  <Animated.View>
                    <TextInput label="Price" value={price} onChangeText={text => setPrice(text)} keyboardType="numeric" style={styles.inputField} />
                  </Animated.View>
                ) : (
                  <></>
                )}
              </>
            )}

            {/** Price Input */}
            <Space top={5} bottom={5} />
            {/** description Selector */}
            {skeleton ? (
              <Animated.View style={textAnimation}></Animated.View>
            ) : (
              <>
                <TextInput label="Description" value={description} onChangeText={text => setDescription(text)} maxLength={300} multiline style={styles.inputField} />
                <Text style={{ textAlign: 'right' }}>{description.length} / 300</Text>
              </>
            )}

            <Separator title='Location' />
            {/** Wilaya selector */}
            {skeleton ? (
              <>
                <Animated.View style={textAnimation}></Animated.View>
                <Animated.View style={textAnimation}></Animated.View>
              </>
            ) : (
              <>
                {wilaya_id ? (
                  <DropDownComponent defaultValue={wilaya_id} select='Wilaya' required={true} data={WilayaList}
                    onItemSelected={e => {
                      setWilaya(e);
                      const itemWithId2 = WilayaList.find(item => item.value === e);
                      setWilayaName(itemWithId2.label);
                    }}
                  />
                ) : (<></>)}
                {wilayaError ? (<View><Text style={{ paddingBottom: 20, color: colors.red, paddingLeft: 20 }}>Please select Wialaya 👆</Text></View>) : (<></>)}
                {/** Location Input */}
                {wilaya_id ? (
                  <TextInput label="Location" value={location} onChangeText={text => setLocation(text)} style={styles.inputField} />
                ) : (
                  <></>
                )}
              </>
            )}

            <Separator title='Optional' />
            {/** Birthday Input */}
            {skeleton ? (
              <>
                <Animated.View style={textAnimation}></Animated.View>
                <Animated.View style={textAnimation}></Animated.View>
                <Animated.View style={textAnimation}></Animated.View>
                <Animated.View style={textAnimation}></Animated.View>
              </>
            ) : (
              <>
                {birthday ? (
                  <CalendarAge defaultDate={birthday} onSelectDate={e => setBirthday(e)} />
                ) : (<></>)}
                {/** Name Input */}
                <TextInput label="Name" value={name} onChangeText={text => setName(text)} style={styles.inputField} />
                {/** Color Input */}
                <TextInput label="Colors" value={color} onChangeText={text => setColor(text)} style={styles.inputField} />
                {/** Weight Input */}
                <TextInput label="Weight" value={weight} onChangeText={text => setWeight(text)} style={styles.inputField} />
                {/** Phone number Input */}
                <TextInput value={phoneNumber} label="Phone number *" onChangeText={text => setPhoneNumber(text)} style={styles.inputField} keyboardType="numeric" render={props => <MaskInput  {...props} mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} />} />
                {phoneNumberError ? (<View><Text style={{ paddingBottom: 20, color: colors.red, paddingLeft: 20 }}>Please select Phone Number 👆</Text></View>) : (<></>)}
              </>
            )}

            <Space top={10} bottom={10} />
            {/** Actions */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ backgroundColor: colors.button, borderRadius: 5, padding: 12, paddingHorizontal: 30 }}
                onPress={UpdatePet}
              >
                <Text style={{ color: colors.white, textAlign: 'center' }}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 12, paddingHorizontal: 30 }}>
                <Text style={{ color: colors.menu, textAlign: 'center' }}></Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {isActive == 1 ? (
          <TouchableOpacity style={{ padding: 10, marginTop: 0 }} onPress={() => setArchiveVisible(true)}>
            <Text style={{ color: colors.menu, fontSize: 15, textAlign: 'center' }}>archive/hide this pet</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ padding: 10, marginTop: 0 }} onPress={() => setUnArchiveVisible(true)}>
            <Text style={{ color: colors.menu, fontSize: 15, textAlign: 'center' }}>Activate/Show this pet</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={{ padding: 10, marginTop: 30 }} onPress={() => setDeleteVisible(true)}>
          <Text style={{ color: colors.red, fontSize: 15, textAlign: 'center' }}>delete this pet</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <Dialog.Container visible={archiveVisible} onBackdropPress={handleCancel}>
        <Dialog.Title>Are you sure to Hide from Search</Dialog.Title>
        <View>
          <Dialog.Button style={{ color: colors.red }} label="Yes" onPress={archiveThisPet} />
          <Dialog.Button style={{ color: 'green' }} label="No" onPress={handleCancel} />
        </View>
      </Dialog.Container>

      <Dialog.Container visible={unArchiveVisible} onBackdropPress={handleCancel}>
        <Dialog.Title>Are you sure to Show it in Seach</Dialog.Title>
        <View>
          <Dialog.Button style={{ color: colors.red }} label="Yes" onPress={unArchiveThisPet} />
          <Dialog.Button style={{ color: 'green' }} label="No" onPress={handleCancel} />
        </View>
      </Dialog.Container>

      <Dialog.Container visible={deleteVisible} onBackdropPress={handleCancel}>
        <Dialog.Title>To Delete, type the following in input
          <View style={{ backgroundColor: colors.red, paddingHorizontal: 7, borderRadius: 5 }}>
            <Text style={{ color: colors.white, textAlign: 'center' }}>{deletionVertificationText}</Text>
          </View>
        </Dialog.Title>
        <TextInput label="Here" value={deleteVerification} onChangeText={text => setDeleteVerification(text)} />
        <View>
          {deleteVerification === deletionVertificationText ? (
            <Dialog.Button style={{ color: colors.red }} label="Yes" onPress={deletePet} />
          ) : (
            <Dialog.Button style={{ color: colors.lightGrey }} label="Yes" onPress={() => { }} />
          )}
          <Dialog.Button style={{ color: 'green' }} label="No" onPress={handleCancel} />
        </View>
      </Dialog.Container>

    </View>
  )
}



const Separator = ({ title }) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
      <DashedLine style={{ width: 69 }} />
      <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '500', color: colors.menu }}>
        {title}
      </Text>
      <DashedLine style={{ width: 69 }} />
    </View>
  )
}

const Space = ({ top = 0, bottom = 0 }) => {
  return (
    <View style={{ marginTop: top, marginBottom: bottom }}></View>
  )
}

const DropDownComponent = ({ defaultValue, select = 'title', required = false, data, onItemSelected }) => {
  const [value, setValue] = useState(defaultValue);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={[styles.label, isFocus && { color: '#4a148c' }]}>
        {select}
        {required ? (<Text style={{ color: colors.red }}> *</Text>) : (<></>)}
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderBottomColor: '#4a148c', borderBottomWidth: 2 }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select ' + select + (required ? ' *' : '') : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onItemSelected(item.value);
        }}
      />
    </View>
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
  },
  container: {
    backgroundColor: colors.background,
    paddingTop: 9,
    paddingHorizontal: 0,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingLeft: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 10,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 13,
    opacity: 0.7,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 13,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 13,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

