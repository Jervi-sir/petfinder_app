/* Components */
/* Screens */
import { HomeScreen } from '@screens/M1/HomeScreen';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { ShowProfile } from '@screens/M5/Profile/ShowProfile';
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
            animationEnabled: true,
            transitionSpec: {
              open: {
                animation: 'timing',
                stiffness: 1,
                damping: 20,
                mass: 3,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01
              },
              close: {
                animation: 'timing',
                stiffness: 1,
                damping: 20,
                mass: 3,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01
              }
            }
          })}
        >
          <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
          <Stack.Screen name={Routes.ShowPetScreen} component={ShowPetScreen} />
          <Stack.Screen name={Routes.ShowProfile} component={ShowProfile} />
          <Stack.Screen name={Routes.MessageScreen} component={MessageScreen} />
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
