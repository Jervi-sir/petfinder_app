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

export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const navigation = useNavigation();

  function loginSubmit() {
    navigation.dispatch(
      StackActions.replace('HomeScreen')
    );
  }
  return(
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <StatusBar />
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
                value={Password}
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
                onPress={loginSubmit}>
                  <Text style={{color: 'white'}}>Register</Text>
                </TouchableOpacity>
            </View>
            <View>
              <Link style={{color: colors.button, marginTop: 10}} to={{ screen: 'Register', params: { id: 'jane' } }}>
                I don't have an Account
              </Link>
            </View>
          </View>
      </ScrollView>
    </View>
  )
}