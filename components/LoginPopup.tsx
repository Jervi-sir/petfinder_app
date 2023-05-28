import React, { useState } from 'react';
import { View, Text,  TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { ScrollView, Image } from "react-native"
import { Link, useNavigation } from '@react-navigation/native';
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { api } from "@constants/api";
import { routes } from "@constants/routes";
import { saveAuthToken } from "@functions/cookies";
import { TextInput } from "react-native-paper"

import { GlobalVariable } from '@constants/GlobalVariable';


export const LoginPopup = ({ isVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const goBack = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: routes.m3 }],
      });
  }

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
        console.log(token)
        saveAuthToken(token);
        setTimeout(() => {
          navigation.goBack();
        }, 200);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
   <View style={{marginBottom: 30}} >
     <Modal isVisible={isVisible} backdropOpacity={0.3}>
      <View >
        <ScrollView style={{backgroundColor: colors.background, borderRadius: 20, position: 'relative'}}>
            <View style={{flexDirection: 'row', justifyContent:'center', width: '100%', paddingTop: 30}}>
              <Image source={icons.LOGO} style={{width: 70, height: 70}} />
            </View>
            <TouchableOpacity onPress={() => {console.log(GlobalVariable.authToken)}}>
              <Text>get</Text>
            </TouchableOpacity>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginBottom: 20
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
            <TouchableOpacity onPress={goBack}>
              <Text>Go Back</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
   </View>
  );
};
