import { routes } from '@constants/routes';
import { getAuthToken } from '@functions/cookies';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
import { EditPetScreen } from '@screens/Pet/Edit/EditPetScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { EditProfile } from '@screens/Profile/EditProfile';
import { ShowMyProfile } from '@screens/Profile/showMyProfile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import { colors } from '@constants/colors';
import { Image, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import DashedLine from 'react-native-dashed-line';
import { useNavigationState } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { setToken } from '@functions/authToken';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function M5Navigation() {
  const navigation = useNavigation();
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(null);

  const navigationState = useNavigationState((state) => state);
    useEffect(() => {
    getAuthToken().then(token => setToken(token));
  }, []);

  const handlePressFromChild = () => {
    navigation.getParent().dispatch(DrawerActions.toggleDrawer())
    setOpen(!open);
  };

  return (
    <>
      <HeaderHamburger onPress={handlePressFromChild} open={open} />
      <Drawer.Navigator 
        initialRouteName="My Profile" 
        screenOptions={{
            headerShown: false,
            
            drawerPosition: 'right',
            drawerStyle: {
              backgroundColor: colors.background,
              width: 240,
            },
            //drawerActiveBackgroundColor: 'rgba(91, 94, 151, 0.43)'
            drawerActiveTintColor: colors.menu,
            gestureHandlerProps: {
              maxPointers: 0
            }
        }}
        >
        <Drawer.Screen name="My Profile" component={MainScreen} />
        <Drawer.Screen name="Soon" component={SoonScreen} />
      </Drawer.Navigator>
    </>
  )
}

const HeaderHamburger = ({onPress, open}) => {
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7}}>
        <Image style={{width: 69 - 20, height: 69 - 20, marginRight: 17}} source={require('@assets/icons/logo.png')} />
        <TouchableOpacity onPress={onPress}>
          {!open 
          ? 
          <Image style={{width: 69 - 30, height: 69 - 30, marginRight: 17}} source={require('@assets/icons/hamburger.png')} />
          :
          <Image style={{width: 69 - 30, height: 69 - 30, marginRight: 17}} source={require('@assets/icons/hamburger_close.png')} />
          }
        </TouchableOpacity>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}

const MainScreen = () => {
  return (
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
  )
}

function SoonScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mzl Nzidha later</Text>
    </View>
  );
}