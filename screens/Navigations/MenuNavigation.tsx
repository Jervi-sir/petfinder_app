import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, StyleSheet } from 'react-native';

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
  return (
    <>
      <Tab.Navigator initialRouteName={routes.m3}
        screenOptions={{
          tabBarStyle: styles.menu2,
          //tabBarStyle: {backgroundColor: colors.menu, height: '12%', paddingTop: 20, position: 'absolute', bottom:-10, left: 0, zIndex: -1},
          headerShown: false,
        }}
      >
        <Tab.Screen name={routes.m1} component={M1Navigation} options={{ tabBarLabel: () => null, tabBarIcon: ({ focused }) => <Animated.Image style={{ width: 20, height: 20, tintColor: focused ? colors.gold : colors.white }} source={icons.HOME} /> }} />
        <Tab.Screen name={routes.m2} component={M2Navigation} options={{ tabBarLabel: () => null, tabBarIcon: ({ focused }) => <Animated.Image style={{ width: 20, height: 20, tintColor: focused ? colors.gold : colors.white }} source={icons.CHAT} /> }} />
        <Tab.Screen name={routes.m3} component={M3Navigation} options={{ tabBarLabel: () => null, tabBarIcon: ({ focused }) => <Animated.Image style={{ width: 20, height: 20, tintColor: focused ? colors.gold : colors.white }} source={icons.FAVORITE} /> }} />
        <Tab.Screen name={routes.m4} component={M4Navigation} options={{ tabBarLabel: () => null, tabBarIcon: ({ focused }) => <Animated.Image style={{ width: 20, height: 20, tintColor: focused ? colors.gold : colors.white }} source={icons.ADDPET} /> }} />
        <Tab.Screen name={routes.m5} component={M5Navigation} options={{ tabBarLabel: () => null, tabBarIcon: ({ focused }) => <Animated.Image style={{ width: 20, height: 20, tintColor: focused ? colors.gold : colors.white }} source={icons.PROFILE} /> }} />
      </Tab.Navigator>
    </>
  )
}

const styles = StyleSheet.create({
  menu1: {
    backgroundColor: colors.menu,
    position: 'absolute', bottom: 0,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    shadowColor: colors.menu,
  },
  menu2: {
    zIndex: 99,
    backgroundColor: colors.menu,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    elevation: 5,
  }
})