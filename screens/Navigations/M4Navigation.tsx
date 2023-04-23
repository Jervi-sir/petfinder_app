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
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { getAuthToken } from '@functions/cookies';
import { setToken, getToken, removeToken } from '@functions/authToken';

const Stack = createStackNavigator();

export default function M4Navigation() {
  console.log(getToken())
  return(
    <>
      <Stack.Navigator 
        initialRouteName={routes.ADDPET}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
      }}
      >
        <Stack.Screen name={ routes.ADDPET } component={AddScreen} />
        <Stack.Screen name={ routes.PREVIEWPET } component={PreviewPet} />
        <Stack.Screen name={routes.AUTH} component={AuthScreen} options={{
          cardStyle: {
            backgroundColor: 'transparent',
            height: '70%'
          },
          presentation: 'modal',
          gestureEnabled: false,
        }}/>
      </Stack.Navigator>
    </>
  )
}

