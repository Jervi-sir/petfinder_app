import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '@constants/routes';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { OptionScreen } from '@screens/Options/OptionScreen';

import {View, Text, Image, ScrollView, TextInput} from 'react-native'
import DashedLine from 'react-native-dashed-line';
import { colors } from '@constants/colors';


const Stack = createStackNavigator();

export default function M3Navigation() {

  return(
    <>
      <HeaderSearch />
      <Stack.Navigator 
          initialRouteName={ routes.HOME }
          screenOptions={() => ({
            headerShown: false,
            headerLeft: null
          })}
        >
        
        <Stack.Screen name={ routes.OPTIONS } component={OptionScreen} />
        <Stack.Screen name={ routes.VIEWPET } component={ShowPetScreen} />
      </Stack.Navigator>
    </>
  )
}


export const HeaderSearch = () => {
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 7, justifyContent: 'space-between'}}>
        <Image style={{width: 69 - 20, height: 69 - 20, marginRight: 17}} source={require('@assets/icons/logo.png')} />
        <Text>Discover</Text>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}