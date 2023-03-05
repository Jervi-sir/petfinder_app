import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from "constants/colors"
import { HomeScreen } from '@screens/Home/HomeScreen';
import { AddScreen } from '@screens/Pet/AddScreen';
import {  Animated } from 'react-native';
import { ShowProfile } from '@screens/Profile/ShowProfile';

import routes from 'constants/routes';
import icons from 'constants/icons';
import { SearchScreen } from '@screens/Search/SearchScreen';
const Tab = createBottomTabNavigator();

export default function HomeNavigation() {
  return(
    <Tab.Navigator screenOptions={{
      tabBarStyle: {backgroundColor: colors.menu, position: 'absolute', bottom: 0, borderRadius: 120},
      //tabBarStyle: {backgroundColor: colors.menu, height: '12%', paddingTop: 20, position: 'absolute', bottom:-10, left: 0, zIndex: -1},
      headerShown: false,
    }}
    >
      <Tab.Screen name={ routes.HOME } component={SearchScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.HOME} />}} />
      <Tab.Screen name={ routes.CHAT } component={ShowProfile} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.CHAT} />}} />
      <Tab.Screen name={ routes.FAVORITE } component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.FAVORITE} />}} />
      <Tab.Screen name={ routes.ADDPET } component={AddScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.ADDPET} />}} />
      <Tab.Screen name={ routes.PROFILE } component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? colors.gold : colors.white}} source={icons.PROFILE} />}} />
    </Tab.Navigator>
  )
}