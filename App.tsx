import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screens/Home/HomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {backgroundColor: '#333A5A'},
        headerShown: false
        }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? '#FEB237' : 'white'}} source={require('./assets/icons/menu/home.png')} />}} />
        <Tab.Screen name="Chat" component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? '#FEB237' : 'white'}} source={require('./assets/icons/menu/chat.png')} />}} />
        <Tab.Screen name="Fav" component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? '#FEB237' : 'white'}} source={require('./assets/icons/menu/fav.png')} />}} />
        <Tab.Screen name="Add" component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? '#FEB237' : 'white'}} source={require('./assets/icons/menu/add.png')} />}} />
        <Tab.Screen name="Profile" component={HomeScreen} options={{tabBarLabel: () => null,tabBarIcon: ({focused}) => <Animated.Image style={{width: 20, height: 20, tintColor: focused ? '#FEB237' : 'white'}} source={require('./assets/icons/menu/profile.png')} />}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
