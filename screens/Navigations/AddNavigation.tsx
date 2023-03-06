import {  Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native'

import { StatusBar } from "@components/StatusBar";
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { HeaderSearch } from '@components/HeaderSearch';
import { AddScreen } from '@screens/Pet/Add/AddScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
import { routes } from '@constants/routes';

const Stack = createStackNavigator();

export default function AddNavigation() {

  return(
    <>
    <StatusBar />
      <View>
        <HeaderSearch />
      </View>
      <Stack.Navigator 
        initialRouteName='search' 
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
      }}
      >
        <Stack.Screen name={ routes.ADDPET } component={AddScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.HOME} />}} />
        <Stack.Screen name={ routes.PREVIEWPET } component={PreviewPet} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.CHAT} />}} />
      </Stack.Navigator>
    </>
  )
}