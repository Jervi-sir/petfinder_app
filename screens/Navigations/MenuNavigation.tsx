import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  Animated } from 'react-native';

import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { routes } from '@constants/routes';
import M1Navigation from './M1Navigation';
import M2Navigation from './M2Navigation';
import M3Navigation from './M3Navigation';
import M4Navigation from './M4Navigation';
import M5Navigation from './M5Navigation';
import { HeaderSearch } from '@components/HeaderSearch';

const Tab = createBottomTabNavigator();

export default function MenuNavigation() {
  return(
    <>
      <HeaderSearch />
      <Tab.Navigator initialRouteName={ routes.m3 }
      screenOptions={{
        tabBarStyle: {backgroundColor: colors.menu, position: 'absolute', bottom: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30},
        //tabBarStyle: {backgroundColor: colors.menu, height: '12%', paddingTop: 20, position: 'absolute', bottom:-10, left: 0, zIndex: -1},
        headerShown: false,
      }}
      >
        <Tab.Screen name={ routes.m1 } component={M1Navigation} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.HOME} />}} />
        <Tab.Screen name={ routes.m2 } component={M2Navigation} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.CHAT} />}} />
        <Tab.Screen name={ routes.m3 } component={M3Navigation} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.FAVORITE} />}} />
        <Tab.Screen name={ routes.m4 } component={M4Navigation} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.ADDPET} />}} />
        <Tab.Screen name={ routes.m5 } component={M5Navigation} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.PROFILE} />}} />
      </Tab.Navigator>
    </>
  )
}