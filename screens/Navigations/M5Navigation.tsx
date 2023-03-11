import { routes } from '@constants/routes';
import { getAuthToken } from '@functions/cookies';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';
import { EditPetScreen } from '@screens/Pet/Edit/EditPetScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { EditProfile } from '@screens/Profile/EditProfile';
import { ShowMyProfile } from '@screens/Profile/showMyProfile';
const Stack = createStackNavigator();
import { useState, useEffect } from 'react';

export default function M5Navigation() {
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
          <Stack.Screen name={ routes.SHOWMYPROFILE } component={ShowMyProfile} />
          <Stack.Screen name={ routes.EDITPROFILE } component={EditProfile} />
          <Stack.Screen name={ routes.SHOWPET } component={ShowPetScreen} />
        </Stack.Navigator>
    </>
  )
}