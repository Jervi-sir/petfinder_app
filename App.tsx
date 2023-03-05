import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './screens/Auth/LoginScreen';
import { RegisterScreen } from './screens/Auth/RegisterScreen';
import HomeNavigation from './screens/Navigations/HomeNavigation';
import { useState } from 'react';

const Stack = createStackNavigator();

export default function App() {
  const [auth, setAuth] = useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null
        })}
      >
        {!auth ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="HomeScreen" component={HomeNavigation} />
          </>
        ) : (
          <Stack.Screen name="HomeScreen" component={HomeNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
