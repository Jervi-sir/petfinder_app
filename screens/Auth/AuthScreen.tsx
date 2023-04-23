import { useState } from "react"
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper"
import { Link } from '@react-navigation/native';

import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { api } from "@constants/api";
import { routes } from "@constants/routes";
import { getAuthToken, saveAuthToken } from "@functions/cookies";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken } from "@functions/authToken";

const Stack = createStackNavigator();

export const AuthScreen = () => {
  return (
    <View style={{backgroundColor: colors.background, position: 'absolute', left: 0, right: 0, bottom: 0, top: SCREEN_HEIGHT * 0.2, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden'}}>
      <Stack.Navigator 
      initialRouteName={routes.LOGIN}
      screenOptions={() => ({
        headerShown: false,
          headerLeft: null,
        })}
      >
        <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
        <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
      </Stack.Navigator>
    </View>
  )
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginAuth() {
    const data = {email, password};
    fetch( api.Server + api.Login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        var token = data.token;
        saveAuthToken(token);
        setTimeout(() => {
        //console.log(getToken())
        navigation.popToTop();
          
        }, 1000);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
    <ScrollView >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90%',
          width: '100%',
        }}>
          <View style={{
            width: '80%', 
            flexDirection: 'row', 
            alignItems:'center', 
            justifyContent: 'space-around'
          }}>
            <Text style={{fontSize: 25, color: colors.button, fontWeight: '500', marginTop: 20}}>Login</Text>
            <Image source={icons.CATLOGIN} />
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
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={{marginBottom: 10, backgroundColor: colors.white}}
            />
            <TextInput
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={{marginBottom: 20, backgroundColor: colors.white}}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View >
                <Link style={{color: colors.button, fontSize:12, paddingLeft: 15}} to={{ screen: 'ForgotPassword', params: { id: 'jane' } }}>
                  forgot my Password
                </Link>
              </View>
              <TouchableOpacity onPress={loginAuth} style={{
                width: 104,
                height: 40,
                borderRadius: 5,
                backgroundColor: colors.menu,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{color: 'white'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER)} style={{ marginTop: 10}}>
              <Text style={{color: colors.button}}>
              I don't have an Account
              </Text>
            </TouchableOpacity>
          
          </View>
        </View>
    </ScrollView>
  </View>
  );
}


const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  
  function registerAuth() {
    const data = {name, email, password};
    fetch( api.Server + api.Register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        var token = data.token;
        console.log(token)
        //saveAuthToken(token);
        //navigation.navigate("HomeScreen");
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
    <ScrollView >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90%',
          width: '100%',
        }}>
          <View style={{
            width: '80%', 
            flexDirection: 'row', 
            alignItems:'center', 
            justifyContent: 'space-around'
          }}>
            <Text style={{fontSize: 25, color: colors.button, fontWeight: '500', marginTop: 20}}>Register</Text>
            <Image source={icons.CATLOGIN} />
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
              onChangeText={text => setEmail(text)}
              style={{marginBottom: 10, backgroundColor: 'white'}}
            />
            <TextInput
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={{marginBottom: 20, backgroundColor: 'white'}}
            />
            <View style={{marginBottom: 20}}>
              <BouncyCheckbox
                size={18}
                fillColor={colors.menu}
                unfillColor={colors.white}
                text="I want to join"
                textStyle={{fontSize:15, fontWeight: '300', textDecorationLine: "none"}}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={(isChecked: boolean) => {setChecked(isChecked)}}
              />
              </View>
              <TouchableOpacity style={{
                width: '100%',
                height: 40,
                borderRadius: 5,
                backgroundColor: colors.menu,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={registerAuth}>
                <Text style={{color: 'white'}}>Register</Text>
              </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 10}}>
              <Text style={{color: colors.button}}>
              Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
  </View>
  );
}