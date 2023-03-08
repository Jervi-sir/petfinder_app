import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  Animated } from 'react-native';

import AddNavigation from './AddNavigation';

import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { HomeScreen } from '@screens/Home/HomeScreen';
import { ShowProfile } from '@screens/Profile/ShowProfile';
import { routes } from '@constants/routes';
import { SearchScreen } from '@screens/Search/SearchScreen';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import SearchNavigation from './SearchNavigation';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';
import { HomeNavigation } from './HomeNavigation';
import { ProfileNavigation } from './ProfileNavigation';
import { MessageNavigation } from './MessageNavigation';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  const tabPosition = new Animated.Value(0);

  return(
    <Tab.Navigator screenOptions={{
      tabBarStyle: {backgroundColor: colors.menu, position: 'absolute', bottom: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30},
      //tabBarStyle: {backgroundColor: colors.menu, height: '12%', paddingTop: 20, position: 'absolute', bottom:-10, left: 0, zIndex: -1},
      headerShown: false,
    }}
    >
      <Tab.Screen name={ routes.HOME } component={HomeNavigation} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.HOME} />}} />
      <Tab.Screen name={ routes.CHAT } component={MessageNavigation} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.CHAT} />}} />
      <Tab.Screen name={ routes.FAVORITE } component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.FAVORITE} />}} />
      <Tab.Screen name={ routes.ADDNAVIGATION } component={AddNavigation} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.ADDPET} />}} />
      <Tab.Screen name={ routes.PROFILE } component={ProfileNavigation} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.PROFILE} />}} />
    </Tab.Navigator>
  )
}