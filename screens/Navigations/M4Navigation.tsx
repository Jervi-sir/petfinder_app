import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from "@components/StatusBar";
import { HeaderSearch } from '@components/HeaderSearch';
import { AddScreen } from '@screens/Pet/Add/AddScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
import { routes } from '@constants/routes';
import { GlobalVariable } from '@constants/GlobalVariable';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { LoginScreen } from './../Auth/LoginScreen';
import { RegisterScreen } from './../Auth/RegisterScreen';

import React, { useMemo, useRef, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { colors } from '@constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function M4Navigation() {
  const navigation = useNavigation();

 

  useEffect(() => {
    if(GlobalVariable.authToken != '') {
      console.log(routes.LOGIN + 'M4')
    }
  })
  return(
    <>
      <View>
        <HeaderSearch />
      </View>
      <Stack.Navigator 
        initialRouteName={GlobalVariable.authToken = '' ? routes.ADDPET: routes.LOGIN}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
      }}
      >
        <Stack.Screen name={ routes.ADDPET } component={AddScreen} />
        <Stack.Screen name={ routes.PREVIEWPET } component={PreviewPet} />
        <Stack.Screen name={ routes.LOGIN } component={LoginScreen} />
        <Stack.Screen name={ routes.REGISTER } component={RegisterScreen} />

      </Stack.Navigator>
    </>
  )
}

const SheetAuth = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={styles.contentContainer}>
        <Text style={{fontSize: 25, color: colors.button, fontWeight: '500', marginTop: 20}}>Login</Text>
        <BottomSheetTextInput 
          value={email} 
          placeholder="email"
          style={styles.textInput} 
          onChangeText={text => setEmail(text)}
        />
        <BottomSheetTextInput 
          value={password} 
          placeholder="password"
          style={styles.textInput} 
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => {}} style={{
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
    </BottomSheet>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  sheetContainer: {
    // add horizontal space
    marginHorizontal: 24,
  },
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 7,
    backgroundColor: colors.white,
    borderWidth: 2,
    color: "white",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
