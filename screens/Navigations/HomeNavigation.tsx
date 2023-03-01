import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../../constants';
import { HomeScreen } from '../../screens/Home/HomeScreen';
import { AddScreen } from '../../screens/Pet/AddScreen';
import {  Animated } from 'react-native';
import { ShowPetScreen } from '../Pet/ShowPetScreen';
import { ShowMyProfile } from '../Profile/showMyProfile';
import { MessageScreen } from '../Message/messageScreen';
import { EditProfile } from '../Profile/EditProfile';
import { EditPetScreen } from '../Pet/Edit/EditPetScreen';

const Tab = createBottomTabNavigator();


export default function HomeNavigation() {
  return(
    <Tab.Navigator screenOptions={{
      tabBarStyle: {backgroundColor: COLORS.menu, position: 'absolute', bottom: 0, borderRadius: 100},
      headerShown: false,
      }}
      >
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? COLORS.gold : COLORS.white}} source={require('../../assets/icons/menu/home.png')} />}} />
      <Tab.Screen name="Chat" component={EditPetScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? COLORS.gold : COLORS.white}} source={require('../../assets/icons/menu/chat.png')} />}} />
      <Tab.Screen name="Fav" component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? COLORS.gold : COLORS.white}} source={require('../../assets/icons/menu/fav.png')} />}} />
      <Tab.Screen name="Add" component={AddScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? COLORS.gold : COLORS.white}} source={require('../../assets/icons/menu/add.png')} />}} />
      <Tab.Screen name="Profile" component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? COLORS.gold : COLORS.white}} source={require('../../assets/icons/menu/profile.png')} />}} />
    </Tab.Navigator>
  )
}