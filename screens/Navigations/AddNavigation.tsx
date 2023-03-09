import { Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native'

import { StatusBar } from "@components/StatusBar";
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { HeaderSearch } from '@components/HeaderSearch';
import { AddScreen } from '@screens/Pet/Add/AddScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
import { routes } from '@constants/routes';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';

const Stack = createStackNavigator();

export default function AddNavigation() {

  return(
    <>
    <StatusBar />
      <View>
        <HeaderSearch />
      </View>
      <Stack.Navigator 
        initialRouteName={ routes.ADDPET }
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