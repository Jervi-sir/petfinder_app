/* Components */
import { HeaderWithTitle } from '@components/HeaderWithTitle';
import { LogoHeader } from '@components/LogoHeader';
/* Screens */
import { OptionScreen } from '@screens/M3/OptionScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
/* packages */
import DashedLine from 'react-native-dashed-line';
import {View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
/* constants */
import { colors } from '@constants/colors';
import Routes from '@utils/Routes';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { useAuth } from '@context/AuthContext';
import { Platform } from 'react-native';
/* useContexts */
/*--------------*/

const currentPlatform = Platform.OS;
const Stack = createStackNavigator();

export default function M3Navigation() {
  const { BearerToken } = useAuth();
  const modal = {
    cardStyle: {
      backgroundColor: currentPlatform == 'android' ? 'rgba(0,0,0,0.5)' : 'transparent',
      height: '10%'
    },
    presentation: currentPlatform == 'android' ? 'transparentModal' : 'modal',
    gestureEnabled: true,
  }

  return(
    <>
      <HeaderWithTitle title='Discover' />
      <Stack.Navigator 
          initialRouteName={ Routes.OptionScreen }
          screenOptions={() => ({
            headerShown: false,
            headerLeft: null,
            animationEnabled: true
          })}
        >
        <Stack.Screen name={ Routes.OptionScreen } component={OptionScreen} />
        <Stack.Screen name={ Routes.ShowPetScreen } component={ShowPetScreen} />
        {
            BearerToken === null &&
            <>
              <Stack.Screen name={ Routes.AUTH } component={AuthScreen} options={{
                cardStyle: {
                  backgroundColor: currentPlatform == 'android' ? 'rgba(0,0,0,0.5)' : 'transparent',
                  height: '10%'
                },
                presentation: currentPlatform == 'android' ? 'transparentModal' : 'modal',
                gestureEnabled: true,
              }} />
            </>
          }
      </Stack.Navigator>
    </>
  )
}
