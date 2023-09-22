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
/* useContexts */
/*--------------*/


const Stack = createStackNavigator();

export default function M3Navigation() {

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
      </Stack.Navigator>
    </>
  )
}
