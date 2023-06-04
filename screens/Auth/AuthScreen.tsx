import { useEffect, useRef, useState } from "react"
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
import { getToken } from "@functions/authToken";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Dimensions } from 'react-native';
import PasswordMeter from "@components/PasswordMeter";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const Stack = createStackNavigator();

export const AuthScreen = ({redirectAfterAuth = null, menuId = 4}) => {
  const navigation = useNavigation();
  return (
    <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: SCREEN_HEIGHT * 0.11, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden'}}>
      <Stack.Navigator 
      initialRouteName={routes.REGISTER  +  menuId}
      screenOptions={() => ({
        headerShown: false,
          headerLeft: null,
        })}
      >
        <Stack.Screen name={routes.LOGIN + menuId}>
        {() => <LoginScreen navigation={navigation} routeName={redirectAfterAuth} menuId={menuId} />}
        </Stack.Screen>
        <Stack.Screen name={routes.REGISTER + menuId}>
        {() => <RegisterScreen navigation={navigation} routeName={redirectAfterAuth} menuId={menuId} />}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  )
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const isValidPassword = (password) => {
  const passwordRegex = /^.{8,}$/;
  return passwordRegex.test(password);
};

const LoginScreen = ({ navigation, routeName, menuId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorGlobal, setErrorGlobal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const isFocused = useIsFocused();
  const translateYValue = useRef(new Animated.Value(100)).current;

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


  function loginAuth() {
    if(!isValidEmail(email)) return setErrorEmail(true);
    else setErrorEmail(false);

    if(!isValidPassword(email)) return setErrorPassword(true);
    else setErrorPassword(false);

    setIsProcessing(true);
    axios.post(api.Server + api.Login, {email, password}, {headers: {'Accept': 'application/json','Content-Type': 'application/json','Language': 'fr'}})
      .then(response => {
        var token = response.data.token;
        saveAuthToken(token);
        setTimeout(() => {
          navigation.popToTop();
          if(routeName) {
            navigation.reset({
              index: 0,
              routes: [{ name: routeName }],
            });
          }
          setIsProcessing(false);
        }, 500);
      })
      .catch(error => {
        const errors = error.response.data.message
        setErrorMessage(errors);
        setErrorGlobal(true);
        setErrorPassword(true);
        setErrorEmail(true);
        setIsProcessing(false);
      });
  }
  return (
    <KeyboardAwareScrollView extraScrollHeight={69} scrollEnabled={false} >
      <View style={{backgroundColor: colors.background, minHeight: '100%'}}>
          <View style={{
            alignItems: 'center',
            minHeight: '90%',
            width: '100%',
            paddingTop: 50
          }}>
            <View style={{
              width: '80%', 
              flexDirection: 'row', 
              alignItems:'center', 
              justifyContent: 'space-around'
            }}>
              <Text style={{fontSize: 25, color: colors.button, fontWeight: '500', marginTop: 20}}>Login</Text>
              <View >
                <Animated.Image style={{ transform: [{translateY: translateYValue,}]}} source={icons.CATLOGIN} />
              </View>
            </View>
            <View style={{
                backgroundColor: 'white',
                width: '80%',
                borderRadius: 15,
                paddingHorizontal:20,
                paddingBottom: 20,
                paddingTop: 20,
                marginTop: -5
              }}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={text => {setEmail(text); setErrorEmail(false); setErrorGlobal(false)}}
                style={{marginBottom: 10, backgroundColor: colors.white}}
                error={errorEmail}
              />
              <TextInput
                label="Password"
                value={password}
                secureTextEntry={secureTextEntry}
                onChangeText={text => {setPassword(text); setErrorPassword(false); setErrorGlobal(false)}}
                style={{marginBottom: 20, backgroundColor: colors.white}}
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
              <View style={{marginBottom: 20, }}>
                <PasswordMeter password={password} />
              </View>              
              {errorGlobal ?
                <Text style={{textAlign: 'center', paddingBottom: 15, color: colors.error}}>{errorMessage}</Text>
              :
                <></>
              }
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={loginAuth} style={{
                  width: '100%',
                  paddingVertical: 15,
                  borderRadius: 5,
                  backgroundColor: colors.menu,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isProcessing ? 
                    <ActivityIndicator size="small" color={colors.background} />
                    :
                    <View style={{marginVertical: 3}}>
                      <Text style={{color: colors.white}}>Login</Text>
                    </View>
                  }
                </TouchableOpacity>
                <View style={{marginTop: 20}}>
                  <Link style={{color: colors.button, fontSize:12}} to={{ screen: 'ForgotPassword', params: { id: 'jane' } }}>
                    forgot my Password
                  </Link>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER + menuId)} style={{ marginTop: 10}}>
                <Text style={{color: colors.button, textAlign: 'center'}}>
                I don't have an Account
                </Text>
              </TouchableOpacity>
              {
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
                }

            </View>
          </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const RegisterScreen = ({ navigation, routeName, menuId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorGlobal, setErrorGlobal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

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

  function registerAuth() {
    if(!isValidEmail(email)) return setErrorEmail(true);
    else setErrorEmail(false);

    if(!isValidPassword(email)) return setErrorPassword(true);
    else setErrorPassword(false);

    setIsProcessing(true);
    axios.post(api.Server + api.Register, {name, email, password}, {headers: {'Accept': 'application/json','Content-Type': 'application/json','Language': 'fr'}})
    .then(response => {
      var token = response.data.token;
      saveAuthToken(token);
      setTimeout(() => {
        navigation.popToTop();
        if(routeName) {
          navigation.reset({
            index: 0,
            routes: [{ name: routeName }],
          });
        }
        setIsProcessing(false);
      }, 500);
    })
    .catch(error => {
      const errors = error.response.data.message
      setErrorMessage(errors);
      setErrorGlobal(true);
      setErrorPassword(true);
      setErrorEmail(true);
      setIsProcessing(false);
    });
  }

  return (
    <KeyboardAwareScrollView extraScrollHeight={100} scrollEnabled={false} >
      <View style={{backgroundColor: colors.background, minHeight: '100%'}}>
            <View style={{
              alignItems: 'center',
              minHeight: '90%',
              width: '100%',
              paddingTop: 50
            }}>
              <View style={{
                width: '80%', 
                flexDirection: 'row', 
                alignItems:'center', 
                justifyContent: 'space-around'
              }}>
                <Text style={{fontSize: 25, color: colors.button, fontWeight: '500', marginTop: 20}}>Register</Text>
                <View >
                  <Animated.Image style={{ transform: [{translateY: translateYValue,}]}} source={icons.CATLOGIN} />
                </View>
              </View>
              <View style={{
                  backgroundColor: 'white',
                  width: '80%',
                  borderRadius: 15,
                  paddingHorizontal:20,
                  paddingBottom: 40,
                  paddingTop: 20,
                  marginTop: -5
                }}>
                <TextInput
                  label="Name"
                  value={name}
                  onChangeText={text => setName(text)}
                  style={{marginBottom: 10, backgroundColor: 'white'}}
                />
                <TextInput
                  label="Email"
                  value={email}
                  style={{marginBottom: 10, backgroundColor: 'white'}}
                  onChangeText={text => {setEmail(text); setErrorEmail(false); setErrorGlobal(false)}}
                  error={errorEmail}
                />
                <TextInput
                  label="Password"
                  value={password}
                  secureTextEntry={secureTextEntry}
                  onChangeText={text => {setPassword(text); setErrorPassword(false); setErrorGlobal(false)}}
                  style={{backgroundColor: 'white'}}
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
                <View style={{marginBottom: 20, }}>
                  <PasswordMeter password={password} />
                </View>
                <View style={{marginBottom: 20}}>
                  <BouncyCheckbox
                    size={18}
                    fillColor={colors.menu}
                    unfillColor={colors.white}
                    text="I want to join"
                    textStyle={{fontSize:15, fontWeight: '300', textDecorationLine: "none"}}
                    onPress={() => {setChecked(!checked)}}
                  />
                  </View>
                  { errorGlobal ?
                    <Text style={{textAlign: 'center', paddingBottom: 15, color: colors.error}}>{errorMessage}</Text>
                    :
                    <></>
                  }
                  {!checked
                  ?
                  <TouchableOpacity 
                    style={{
                      width: '100%',
                      height: 40,
                      borderRadius: 5,
                      backgroundColor: colors.menu,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={registerAuth}
                  >
                    { isProcessing ? 
                      <ActivityIndicator size="small" color={colors.background} />
                      :
                      <View style={{marginVertical: 3}}>
                        <Text style={{color: colors.white}}>Register</Text>
                      </View>
                    }
                  </TouchableOpacity>
                  :
                  <View  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 5,
                    backgroundColor: colors.menu,
                    opacity: 0.3,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <View style={{marginVertical: 3}}>
                      <Text style={{color: colors.white}}>Register</Text>
                    </View>
                  </View>
                  }
                  
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN + menuId)} style={{ marginTop: 10}}>
                  <Text style={{color: colors.button, textAlign: 'center'}}>
                  Already have an account?
                  </Text>
                </TouchableOpacity>
                {
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
                }
              </View>
            </View>
      </View>
    </KeyboardAwareScrollView>
  );
}