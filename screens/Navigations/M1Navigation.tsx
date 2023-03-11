import { api } from '@constants/api';
import { routes } from '@constants/routes';
import { getAuthToken } from '@functions/cookies';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';
import { HomeScreen } from '@screens/Home/HomeScreen';
import { MessageScreen } from '@screens/Message/messageScreen';
import { EditPetScreen } from '@screens/Pet/Edit/EditPetScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { EditProfile } from '@screens/Profile/EditProfile';
import { ShowMyProfile } from '@screens/Profile/showMyProfile';
import { ShowProfile } from '@screens/Profile/ShowProfile';
import { SearchScreen } from '@screens/Search/SearchScreen';
const Stack = createStackNavigator();
import { useState, useEffect } from 'react';


export default function M1Navigation() {
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
        <Stack.Screen name={routes.HOME} component={HomeScreen} />
        <Stack.Screen name={routes.SEARCH} component={SearchScreen} />
        <Stack.Screen name={routes.SHOWPET} component={ShowPetScreen} />
        <Stack.Screen name={routes.SHOWPROFILE} component={ShowProfile} />
        <Stack.Screen name={routes.MESSAGELIST} component={MessageScreen} />
      </Stack.Navigator>
    </>
  )
}