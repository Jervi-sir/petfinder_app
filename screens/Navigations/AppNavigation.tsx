import { createStackNavigator } from '@react-navigation/stack';
import { routes } from '@constants/routes';
import AuthNavigation from './AuthNavigation';
import MenuNavigation from './MenuNavigation';
import { useEffect } from 'react';
import { getAuthToken } from '@functions/cookies';
import { GlobalVariable } from '@constants/GlobalVariable';
import { setToken } from '@functions/authToken';

const Stack = createStackNavigator();

export default function AppNavigation() {
  
  useEffect(() => {
    getAuthToken().then(e => { setToken(e);}).catch(e => console.log(e));
  }, []);

  return(
    <>
      <Stack.Navigator 
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null,
        })}
      >
        <Stack.Screen name={ routes.MENU } component={MenuNavigation} />
        <Stack.Screen name={ routes.AUTH } component={AuthNavigation} />
      </Stack.Navigator>
    </>
      
  )
}