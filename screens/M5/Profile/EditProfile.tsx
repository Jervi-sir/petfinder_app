/* Components */
/* Screens */
import { FilterDropdown } from "@screens/M1/components/FilterDropdown";
/* packages */
import { Image } from 'expo-image';
import MaskInput from 'react-native-mask-input';
import LottieView from 'lottie-react-native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper';
import Dialog from "react-native-dialog";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
/* constants */
import { colors } from "@constants/colors";
import { routes } from "@constants/routes";
import { icons } from "@constants/icons";
import { api } from "@constants/api";
import { GlobalVariable } from "@constants/GlobalVariable";
/* useContexts */
import { AuthContext } from "@functions/AuthState";
/*--------------*/

import checkmark1 from '@assets/animations/checkmark1.json';
import loading1 from '@assets/animations/loading1.json';
import loading2 from '@assets/animations/loading2.json';
import loading3 from '@assets/animations/loading3.json';
import loading4 from '@assets/animations/loading4.json';
import loading5 from '@assets/animations/loading5.json';
import error1 from '@assets/animations/error1.json';
import Api from "@utils/Api";
import { useAuth } from "@context/AuthContext";
import { useProfile } from "@context/ProfileContext";
import { FloatingDropdown } from "@components/FloatingDropdown";
import { useHelper } from "@context/HelperContext";

export const EditProfile = () => {
  const [image1, setImage1] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedInput, setSelectedInput] = useState(false);
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [wilayaNumber, setWilayaNumber] = useState('');

  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const animationRef = useRef(null);

  const [imageUpload, setImageUpload] = useState('');

  const { BearerToken } = useAuth();
  const { profileState } = useProfile();
  const { wilayaHelper, racesHelper, updateWilaya, updateRaces } = useHelper();
  const [WilayaList, setWilayaList] = useState([]);

  useEffect(() => {
    animationRef.current?.reset();
    
    if(wilayaHelper == null) {
      axios.get(Api.Server + Api.getProfileForEdit, { headers: { Authorization: 'Bearer ' + BearerToken } })
      .then(response => {
        const wilayas = response.data.wilayas;
        updateWilaya(wilayas)

      }).catch(error => {
        console.log(error);
      });
    } else {
      setWilayaList(wilayaHelper)
    }

    setName(profileState.name);
    setLocation(profileState.location);
    setWilayaNumber(profileState.wilaya_number);
    setPhoneNumber(profileState.phone_number);
    setImage1(profileState.pic);

  }, [wilayaHelper]);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      selectionLimit: 10,
      aspect: [4, 3],
      //base64: true,
    });
    setVisible(false);
    if (!result.canceled) {
      const manipulateResult = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.5, base64: true } // from 0 to 1 "1 for best quality"
      );
      setImage1(manipulateResult.uri);
      setImageUpload(manipulateResult.base64);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    setVisible(false);
    if (!result.canceled) {
      const manipulateResult = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.5, base64: true } // from 0 to 1 "1 for best quality"
      );
      setImage1(manipulateResult.uri);
      setImageUpload(manipulateResult.base64);
    }
  };

  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  function updateProfile() {
    const data = { name, location, phoneNumber, imageUpload, wilayaNumber };
    setIsLoading(true);
    axios.post(Api.Server + Api.updateMyProfile, data, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + BearerToken } })
      .then(response => {
        console.log(response.data)
        setIsLoading(false);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
          setTimeout(() => {
            //handleRefresh();
          }, 100)
        }, 2345);
      })
      .catch(error => {
        setIsLoading(false);
        setIsError(true);
        animationRef.current?.play();

        setTimeout(() => {
          setIsError(false);
          animationRef.current?.reset(); 
        }, 1000);
        console.error(error);
      });
  }

  const handleRefresh = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: routes.SHOWMYPROFILE }],
    });
  };

  const setWilaya = (data) => {
    setWilayaNumber(data);
  };
  
  return (
    <>
      {isError ? (
         <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: -69 }}>
            <LottieView
              autoPlay
              ref={animationRef}
              style={{ width: 100, height: 100 }}
              source={error1}
              duration={3000}
              loop={true}
            />
          </View>
        </View>
      ) : null
      }
      {success ? (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: -69 }}>
            <LottieView
              autoPlay
              ref={animationRef}
              style={{ width: 100, height: 100 }}
              source={checkmark1}
              duration={1000}
              loop={false}
            />
          </View>
        </View>
      ) : null}
      {isLoading ? (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: -69, width: 100, height: 100 }}>
            <LottieView
              autoPlay
              ref={animationRef}
              style={{ width: 100, height: 100 }}
              source={loading1}
              loop={true}
            />
          </View>
        </View>
      ) : null}
      <ScrollView>
        <View style={{ margin: 20, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Image source={icons.BACK} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 20, fontSize: 20, color: colors.menu }}>Edit My Profile</Text>
          </View>
          <View></View>
          <View>
            <View style={{ backgroundColor: colors.white, borderRadius: 13, overflow: 'hidden' }}>
              <View style={{ padding: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={showDialog} style={{ backgroundColor: colors.menu, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
                    <Text style={{ color: colors.white, fontSize: 15 }}>choose image</Text>
                  </TouchableOpacity>
                  <View >
                    <View style={{ backgroundColor: colors.emptyImg1, width: 100, height: 100, borderRadius: 10 }}>
                      <Image source={{ uri: image1 }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <TextInput value={name} onChangeText={text => setName(text)} style={styles.inputField} label="Name" />
                  <TextInput value={phoneNumber} label="Phone number" onChangeText={text => setPhoneNumber(text)} style={styles.inputField} keyboardType="numeric" render={props => <MaskInput  {...props} mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]} />} />
                  <FloatingDropdown select='Wilaya' data={WilayaList} onItemSelected={(e) => {setWilaya(e);}} />
                  <TextInput value={location} onChangeText={text => setLocation(text)} style={styles.inputField} label="Location" />
                </View>
              </View>
              <TouchableOpacity onPress={updateProfile} style={{ backgroundColor: colors.menu, padding: 10 }}>
                <Text style={{ color: colors.white, fontSize: 15, textAlign: 'center' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{ padding: 10, marginTop: 20 }}>
            <Text style={{ color: colors.menu, fontSize: 15, textAlign: 'center' }}>reset password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, marginTop: 30 }}>
            <Text style={{ color: colors.red, fontSize: 15, textAlign: 'center' }}>delete account</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 80}}></View>
      </ScrollView>
      <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
        <Dialog.Title>Add image</Dialog.Title>
        <View>
          <Dialog.Button label="Choose in Gallery" onPress={() => pickImage()} />
          <Dialog.Button label="Use Camera" onPress={() => openCamera()} />
        </View>
      </Dialog.Container>
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

});