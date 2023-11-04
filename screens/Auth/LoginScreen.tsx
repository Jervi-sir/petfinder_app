import { useContext, useEffect, useRef, useState } from "react"
import { Text, View, TouchableOpacity, Animated } from "react-native"
import { ActivityIndicator, TextInput } from "react-native-paper"
import { Link, useIsFocused, useNavigation } from '@react-navigation/native';

import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { api } from "@constants/api";
import { routes } from "@constants/routes";
import { saveAuthToken } from "@functions/cookies";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Dimensions } from 'react-native';
import PasswordMeter from "@components/PasswordMeter";
import { AuthContext } from "@functions/AuthState";
import { formatPhoneNumber, isValidEmail, isValidPassword } from "@functions/helpers";
import Api from "@utils/Api";
import { useAuth } from "@context/AuthContext";
import ShakeAnimation from "@components/ShakeAnimation";
import { useProfile } from "@context/ProfileContext";

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const LoginScreen = ({ navigation, routeName, menuId }) => {
  const { BearerToken, saveAuthToken } = useAuth();
  const { updateProfile } = useProfile();
  //Values
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  //Error messages
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorGlobal, setErrorGlobal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [shakePhoneNumber, setShakePhoneNumber] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  //helpers values
  const [isProcessing, setIsProcessing] = useState(false);
  const [checked, setChecked] = useState(true);

  const isFocused = useIsFocused();
  const translateYValue = useRef(new Animated.Value(100)).current;
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    if (isFocused) {
      Animated.timing(translateYValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateYValue, {
        toValue: 200,
        duration: 500,
        useNativeDriver: true,
        delay: 200,
      }).start();
    }
  }, [isFocused]);

  const handlePhoneNumberChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };


  function loginAuth() {
    if (phone_number === '') return setShakePhoneNumber(true);
    if (password.length < 5) return setShakePassword(true);

    setIsProcessing(true);
    axios.post(Api.Server + Api.Login, 
      { phone_number: phone_number.replace(/[\s()-]/g, ""), 
        password: password
      }, 
      { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Language': 'fr' } })
      .then(response => {
        var data = response.data;
        saveAuthToken(data.token);
        updateProfile(data.user_auth_info);
        setTimeout(() => {
          //navigation.popToTop();
          if (routeName) {
            navigation.reset({
              index: 0,
              routes: [{ name: routeName }],
            });
          }
          setIsProcessing(false);
        }, 500);
      })
      .catch(error => {
        const errors = error.response.data.errors
        setErrorMessage('Incorrect Credentials');
        setErrorGlobal(true);
        setErrorPassword(true);
        //setErrorEmail(true);
        setErrorPhoneNumber(true);
        setIsProcessing(false);
        
        setShakePhoneNumber(true);
        setShakePassword(true);
  
        setTimeout(() => {
          setShakePhoneNumber(false);
          setShakePassword(false);
        }, 400);
      });
  }

  return (
    <View style={{ }}>
      <KeyboardAwareScrollView extraScrollHeight={69} scrollEnabled={false} >
        <View style={{ backgroundColor: colors.background, minHeight: SCREEN_HEIGHT }}>
          <View style={{
            alignItems: 'center',
            minHeight: '90%',
            width: '100%',
            paddingTop: 50
          }}>
            <View style={{
              width: '80%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}>
              <Text style={{ fontSize: 25, color: colors.button, fontWeight: '500', marginTop: 20 }}>Login</Text>
              <View >
                <Animated.Image style={{ transform: [{ translateY: translateYValue, }] }} source={icons.CATLOGIN} />
              </View>
            </View>
            <View style={{
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 15,
              paddingHorizontal: 20,
              paddingBottom: 20,
              paddingTop: 20,
              marginTop: -5
            }}>
              <ShakeAnimation trigger={shakePhoneNumber} updateSetError={setShakePhoneNumber}>
                <TextInput
                  placeholder="Phone Number"
                  style={{ marginBottom: 10, backgroundColor: 'white' }}
                  value={phone_number}
                  onChangeText={handlePhoneNumberChange}
                  keyboardType="phone-pad"
                />
              </ShakeAnimation>
              <ShakeAnimation trigger={shakePassword} updateSetError={setShakePassword}>
                <TextInput
                  label="Password"
                  value={password}
                  secureTextEntry={secureTextEntry}
                  onChangeText={text => { setPassword(text); setErrorPassword(false); setErrorGlobal(false) }}
                  style={{ marginBottom: 20, backgroundColor: colors.white }}
                  error={errorPassword}
                  right={
                    <TextInput.Icon
                      icon={secureTextEntry ? "eye" : "eye-off"}
                      size={21} color={colors.menu}
                      onPress={() => {
                        setSecureTextEntry(!secureTextEntry);
                        return false;
                      }}

                    />}
                />
              </ShakeAnimation>
              {errorGlobal ?
                <Text style={{ textAlign: 'center', paddingBottom: 15, color: colors.error }}>{errorMessage}</Text>
                :
                null
              }
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity 
                      style={{
                        width: '100%',
                        height: 40,
                        borderRadius: 5,
                        backgroundColor: colors.menu,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={loginAuth}
                    >
                      { isProcessing ? 
                        <ActivityIndicator size="small" color={colors.background} />
                        :
                        <View style={{marginVertical: 3}}>
                          <Text style={{color: colors.white}}>Login</Text>
                        </View>
                      }
                    </TouchableOpacity>
                <View style={{ marginTop: 20 }}>
                  <Link style={{ color: colors.button, fontSize: 12 }} to={{ screen: 'ForgotPassword', params: { id: 'jane' } }}>
                    forgot my Password
                  </Link>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER, { routeName: routeName})} style={{ marginTop: 10 }}>
                <Text style={{ color: colors.button, textAlign: 'center' }}>
                  I don't have an Account
                </Text>
              </TouchableOpacity>
              {/*
                  routeName ? 
                    <>
                    </>
                    :
                    <>
                      <TouchableOpacity 
                        onPress={() => {navigation.popToTop()}}
                        style={{backgroundColor: colors.maleBackground, paddingHorizontal: 10, paddingVertical:7, borderRadius: 7}}>
                        <Text style={{color: colors.button, fontSize: 18}}>Continue Without Login</Text>
                      </TouchableOpacity>
                    </>
                  */}

            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>

  );
}