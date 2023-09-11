/* Components */
/* Screens */
import { HomeScreen } from '@screens/M1/HomeScreen';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { ShowProfile } from '@screens/Profile/ShowProfile';
/* packages */
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
/* constants */
import { routes } from '@constants/routes';
import Routes from '@utils/Routes';
import { MessageScreen } from '@screens/M3/messages/MessageScreen';
/* useContexts */
/*--------------*/

/* External of this folder */

const currentPlatform = Platform.OS;
const Stack = createStackNavigator();

export default function M1Navigation() {
  return (
    <>
      <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
            headerLeft: null,
            animationEnabled: true
          })}
        >
          <Stack.Screen name={routes.HOME} component={HomeScreen} />
          <Stack.Screen name={routes.VIEWPET} component={ShowPetScreen} />
          <Stack.Screen name={routes.SHOWPROFILE} component={ShowProfile} />
          <Stack.Screen name={routes.MESSAGELIST} component={MessageScreen} />
          {/* 
          <Stack.Screen name={Routes.AUTH} options={{
            cardStyle: {
              backgroundColor: currentPlatform == 'android' ? 'rgba(0,0,0,0.5)' : 'transparent',
              height: '10%'
            },
            presentation: currentPlatform == 'android' ? 'transparentModal' : 'modal',
            gestureEnabled: true,
          }}>
            {() => <AuthScreen menuId={1}/>}
          </Stack.Screen>
          */}
      </Stack.Navigator>
    </>
  )
}
