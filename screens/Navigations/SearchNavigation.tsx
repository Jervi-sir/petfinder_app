import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  Animated } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import AddNavigation from './M4Navigation';

import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { HomeScreen } from '@screens/Home/HomeScreen';
import { routes } from '@constants/routes';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { SearchScreen } from '@screens/Search/SearchScreen';

const Stack = createStackNavigator();

export default function SearchNavigation() {

  return(
    <Stack.Navigator 
        initialRouteName={ routes.HOME }
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null
        })}
      >
      <Stack.Screen name={ routes.HOME } component={SearchScreen} />
      <Stack.Screen name={ routes.VIEWPET } component={ShowPetScreen} />
    </Stack.Navigator>
  )
}
