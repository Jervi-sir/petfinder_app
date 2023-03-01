import { useState } from "react"
import { Text, View, ScrollView, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { TextInput } from "react-native-paper"
import { StatusBar } from "../../components/StatusBar"
import { Link } from '@react-navigation/native';
import { COLORS } from "../../constants"

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  return(
    <View style={{backgroundColor: COLORS.background, flex: 1}}>
      <StatusBar />
      <ScrollView >
          <View style={{position: 'absolute',top: 50, flexDirection: 'row', justifyContent:'center', width: '100%'}}>
            <Image source={require('../../assets/icons/logo.png')} style={{width: 70, height: 70}} />
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
              <Text style={{fontSize: 25, color: COLORS.button, fontWeight: '500', marginTop: 20}}>Login</Text>
              <Image source={require('../../assets/icons/catLogin.png')} />
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
                style={{marginBottom: 10, backgroundColor: COLORS.white}}
              />
              <TextInput
                label="Password"
                value={Password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                style={{marginBottom: 20, backgroundColor: COLORS.white}}
              />
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View >
                  <Link style={{color: COLORS.button, fontSize:12, paddingLeft: 15}} to={{ screen: 'ForgotPassword', params: { id: 'jane' } }}>
                    forgot my Password
                  </Link>
                </View>
                <TouchableOpacity style={{
                  width: 104,
                  height: 40,
                  borderRadius: 5,
                  backgroundColor: COLORS.menu,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text style={{color: 'white'}}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Link style={{color: COLORS.button, marginTop: 10}} to={{ screen: 'Register', params: { id: 'jane' } }}>
                I don't have an Account
              </Link>
            </View>
          </View>
      </ScrollView>
    </View>
  )
}