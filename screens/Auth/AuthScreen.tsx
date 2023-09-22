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
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";

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


