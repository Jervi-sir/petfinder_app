import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';
import { useState, useEffect } from 'react';
import AppNavigation from './AppNavigation';
import { getAuthToken } from '@functions/cookies';

const Stack = createStackNavigator();

export default function AuthNavigation() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    getAuthToken().then(token => setToken(token));
  }, []);
  console.log(token);

  return (
    <>
    <Stack.Navigator 
        initialRouteName="HomeScreen"
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null,
        })}
      >
        <Stack.Screen name="HomeScreen" component={AppNavigation} />
        {token == null ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
          </>
        )}
      </Stack.Navigator>
    </>
  )
}