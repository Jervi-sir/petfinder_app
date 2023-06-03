import { createStackNavigator } from '@react-navigation/stack';
import { AddScreen } from '@screens/Pet/Add/AddScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
import { routes } from '@constants/routes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { colors } from '@constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import DashedLine from 'react-native-dashed-line';
import { getToken } from '@functions/authToken';
import { LogoHeader } from '@components/LogoHeader';
import { Text } from '@components/Text';
import { AlertPet } from '@screens/Pet/Alert/AlertPet';
import { StyleSheet, Platform } from 'react-native';

const Stack = createStackNavigator();
const currentPlatform = Platform.OS;

export default function M4Navigation() {
  return(
    <>
      <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
            headerLeft: null,
            animationEnabled: true
          })}
        >
          <Stack.Screen name='main screen m4' component={MainScreen} />
          <Stack.Screen name={routes.AUTH} options={{
            cardStyle: {
              backgroundColor: currentPlatform == 'android' ? 'rgba(0,0,0,0.5)' : 'transparent',
              height: '10%'
            },
            presentation: currentPlatform == 'android' ? 'transparentModal' : 'modal',
            gestureEnabled: false,
          }}>
            {() => <AuthScreen redirectAfterAuth='Add new Pet m4' />}
          </Stack.Screen>
      </Stack.Navigator>
    </>
  )
}


const HeaderHamburger = ({onPress}) => {
  const navigator = useNavigation();
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7}}>
        <LogoHeader />
        <View style={{flexDirection:'row', alignItems: 'center', paddingRight: 20}}>
          <TouchableOpacity onPress={() => navigator.navigate(routes.ADDPET)}>
            <Text weight='700' size={18}>Add</Text>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 17 }}>
            <Text size={17}>|</Text>
          </View>
          <TouchableOpacity onPress={() => navigator.navigate(routes.ALERTPET)}>
            <Text weight='600' size={18}>Lost</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}

export const MainScreen = ({ navigation }) => {
  
  useEffect(() => {
    if(getToken() == null) {
      navigation.navigate(routes.AUTH)
    }
  }, [getToken()]);

  useFocusEffect(
    useCallback(() => {
      if(getToken() == null) {
        navigation.navigate(routes.AUTH)
      } 
    }, [getToken()])
  );

  const handlePressFromChild = () => {
  };
  return (
    <>
      <HeaderHamburger onPress={handlePressFromChild} />
      <Stack.Navigator 
        initialRouteName={routes.ADDPET}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
      }}
      >
        <Stack.Screen name={ routes.ADDPET } component={AddScreen} />
        {/*<Stack.Screen name={ routes.PREVIEWPET } component={PreviewPet} />*/}
        {/*<Stack.Screen name={ routes.ALERTPET } component={AlertPet} />*/}
        {/*<Stack.Screen name={ routes.PREVIEWPET + 'lost' } component={PreviewPet} />*/}
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