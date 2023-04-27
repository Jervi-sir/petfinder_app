import { createStackNavigator } from '@react-navigation/stack';
import { AddScreen } from '@screens/Pet/Add/AddScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
import { routes } from '@constants/routes';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from "react";
import { View, Text } from "react-native";
import { colors } from '@constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native';
import DashedLine from 'react-native-dashed-line';
import { useNavigationState } from '@react-navigation/native';

const Stack = createStackNavigator();
const DrawerM4 = createDrawerNavigator();

export default function M4Navigation() {
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);
    const handlePressFromChild = () => {
    console.log('Current Navigation State:', navigationState);
  };
  return(
    <>
    <HeaderHamburger onPress={handlePressFromChild}/>
    <DrawerM4.Navigator 
      initialRouteName="Add new Pet" 
      screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          drawerStyle: {
            backgroundColor: colors.background,
            width: 240,
          },
          //drawerActiveBackgroundColor: 'rgba(91, 94, 151, 0.43)'
          drawerActiveTintColor: colors.menu
      }}
      
      >
      <DrawerM4.Screen name="Add new Pet" component={MainScreen} />
      <DrawerM4.Screen name="Soon" component={SoonScreen} />
    </DrawerM4.Navigator>
      
    </>
  )
}

const HeaderHamburger = ({onPress}) => {
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7}}>
        <Image style={{width: 69 - 20, height: 69 - 20, marginRight: 17}} source={require('@assets/icons/logo.png')} />
        <Text style={{ fontSize: 30, fontWeight: "400", color: colors.button, paddingRight: 20 }}>Add new Pet</Text>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}

const MainScreen = () => {
  return (
    <Stack.Navigator 
        initialRouteName={routes.ADDPET}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
      }}
      >
        <Stack.Screen name={ routes.ADDPET } component={AddScreen} />
        <Stack.Screen name={ routes.PREVIEWPET } component={PreviewPet} />
        <Stack.Screen name={routes.AUTH} component={AuthScreen} options={{
          cardStyle: {
            backgroundColor: 'transparent',
            height: '70%'
          },
          presentation: 'modal',
          gestureEnabled: false,
        }}/>
    </Stack.Navigator>
  )
}

function SoonScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mzl Nzidha later</Text>
    </View>
  );
}