import { routes } from '@constants/routes';
import { getAuthToken } from '@functions/cookies';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';
import { MessageScreen } from '@screens/Message/messageScreen';
import { ShowProfile } from '@screens/Profile/ShowProfile';

const Stack = createStackNavigator();
import { useState, useEffect } from 'react';

export default function M2Navigation() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    getAuthToken().then(token => setToken(token));
  }, []);

  return (
    <>
      <Stack.Navigator 
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null,
        })}
      >
        <Stack.Screen name={routes.MESSAGELIST} component={MessageScreen} />
        <Stack.Screen name={routes.SHOWPROFILE} component={ShowProfile} />
      </Stack.Navigator>
    </>
  )
}