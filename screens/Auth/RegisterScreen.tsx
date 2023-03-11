import { useState } from "react"
import { Text, View, ScrollView, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { TextInput } from "react-native-paper"
import { Link } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StackActions, useNavigation } from '@react-navigation/native';

import { StatusBar } from "@components/StatusBar";
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { api } from "@constants/api";
import { getAuthToken, saveAuthToken } from "@functions/cookies";
import { routes } from "@constants/routes";

export const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  
  function registerAuth() {
    const data = {name, email, password};
    fetch( api.SERVER + api.REGISTER, {
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

  return(
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <ScrollView >
          <View style={{position: 'absolute',top: 50, flexDirection: 'row', justifyContent:'center', width: '100%'}}>
            <Image source={icons.LOGO} style={{width: 70, height: 70}} />
          </View>

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
              <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)} style={{ marginTop: 10}}>
                <Text style={{color: colors.button}}>
                Already have an account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    </View>
  )
}