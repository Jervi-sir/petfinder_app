import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '@constants/routes';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { OptionScreen } from '@screens/Options/OptionScreen';

import {View, Text } from 'react-native'
import DashedLine from 'react-native-dashed-line';
import { colors } from '@constants/colors';
import { LogoHeader } from '@components/LogoHeader';
import { HeaderWithTitle } from '@components/HeaderWithTitle';


const Stack = createStackNavigator();

export default function M3Navigation() {

  return(
    <>
      <HeaderWithTitle title='Discover' />
      <Stack.Navigator 
          initialRouteName={ routes.OPTIONS + 'm3' }
          screenOptions={() => ({
            headerShown: false,
            headerLeft: null,
            animationEnabled: true
          })}
        >
        <Stack.Screen name={ routes.OPTIONS + 'm3' } component={OptionScreen} />
        <Stack.Screen name={ routes.VIEWPET + 'm3' } component={ShowPetScreen} />
      </Stack.Navigator>
    </>
  )
}


export const HeaderSearch = () => {
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 7, justifyContent: 'space-between'}}>
        <LogoHeader />
        <Text>Discover</Text>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}