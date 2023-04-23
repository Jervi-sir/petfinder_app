import { GlobalVariable } from '@constants/GlobalVariable';
import { routes } from '@constants/routes';
import { getAuthToken } from '@functions/cookies';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
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
        <Stack.Screen name={routes.SHOWMYPROFILE} component={ShowMyProfile} />
        <Stack.Screen name={routes.EDITPROFILE} component={EditProfile} />
        <Stack.Screen name={routes.SHOWPET} component={ShowPetScreen} />
        <Stack.Screen name={routes.EDITPET} component={EditPetScreen} />
        <Stack.Screen name={routes.PREVIEWPET} component={PreviewPet} />
        <Stack.Screen name={routes.AUTH} component={AuthScreen} options={{
          cardStyle: {
            backgroundColor: 'transparent',
            height: '70%'
          },
          presentation: 'modal',
          gestureEnabled: false,
        }}/>

      </Stack.Navigator>
    </>
  )
}