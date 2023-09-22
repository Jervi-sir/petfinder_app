/* Components */
import { Text } from '@components/Text';
import { LogoHeader } from '@components/LogoHeader';
/* Screens */
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { AddScreen } from '@screens/Pet/Add/AddScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
/* packages */
import DashedLine from 'react-native-dashed-line';
import { StyleSheet, Platform, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { useCallback, useContext, useEffect } from "react";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
/* constants */
import { routes } from '@constants/routes';
import { colors } from '@constants/colors';
/* useContexts */
import { AuthContext } from '@functions/AuthState';
import Routes from '@utils/Routes';
import { useAuth } from '@context/AuthContext';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';
import { TestScreen } from '@screens/TestScreen';
/*--------------*/

const Stack = createStackNavigator();
const currentPlatform = Platform.OS;

export default function M4Navigation() {
  const { BearerToken } = useAuth();
  const modal = {
    cardStyle: {
      backgroundColor: currentPlatform == 'android' ? 'rgba(0,0,0,0.5)' : 'transparent',
      height: '10%'
    },
    presentation: currentPlatform == 'android' ? 'transparentModal' : 'modal',
    gestureEnabled: false,
  }
  return(
    <>
      <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
            headerLeft: null,
            animationEnabled: true
          })}
        >
          
          <Stack.Screen name={Routes.MainScreen} component={MainScreen} />
          {
            BearerToken === null &&
            <>
              <Stack.Screen name={ Routes.LOGIN } component={LoginScreen} options={modal} />
              <Stack.Screen name={ Routes.REGISTER } component={RegisterScreen} options={modal} />
            </>
          }
          {/*
          <Stack.Screen name={Routes.AUTH} options={{
            cardStyle: {
              backgroundColor: currentPlatform == 'android' ? 'rgba(0,0,0,0.5)' : 'transparent',
              height: '10%'
            },
            presentation: currentPlatform == 'android' ? 'transparentModal' : 'modal',
            gestureEnabled: false,
          }}>
            {() => <AuthScreen redirectAfterAuth='Add new Pet m4' />}
          </Stack.Screen>
           */}
      </Stack.Navigator>
    </>
  )
}

export const MainScreen = ({ navigation }) => {
  const { BearerToken } = useAuth();

  useEffect(() => {
    if(BearerToken === null) {
      navigation.navigate(Routes.LOGIN, {routeName: Routes.m4})
    }
  }, [BearerToken]);

  useFocusEffect(
    useCallback(() => {
      if(BearerToken === null) {
        navigation.navigate(Routes.LOGIN, {routeName: Routes.m4})
      } 
    }, [BearerToken])
  );

  const handlePressFromChild = () => {
  };
  return (
    <>
      <HeaderHamburger onPress={handlePressFromChild} />
      <Stack.Navigator 
        initialRouteName={Routes.ADDPET}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
      }}
      >
        <Stack.Screen name={ Routes.AddScreen } component={AddScreen} />
        {/*<Stack.Screen name={ Routes.PREVIEWPET } component={PreviewPet} />*/}
        {/*<Stack.Screen name={ Routes.ALERTPET } component={AlertPet} />*/}
        {/*<Stack.Screen name={ Routes.PREVIEWPET + 'lost' } component={PreviewPet} />*/}
    </Stack.Navigator>
    </>

   
  )
}

export function SoonScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mzl Nzidha later</Text>
    </View>
  );
}


const HeaderHamburger = ({onPress}) => {
  const navigator = useNavigation();
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7}}>
        <LogoHeader />
        <View style={{flexDirection:'row', alignItems: 'center', paddingRight: 20}}>
          <TouchableOpacity onPress={() => navigator.navigate(Routes.AddScreen)}>
            <Text weight='700' size={18}>Add</Text>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 17 }}>
            <Text size={17}>|</Text>
          </View>
          <TouchableOpacity onPress={() => navigator.navigate(Routes.ALERTPET)}>
            <Text weight='600' size={18}>Lost</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}