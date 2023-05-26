import { Image, TouchableOpacity, View } from 'react-native';

import { useState, useEffect, useCallback } from 'react';
import { LogoHeader } from '@components/LogoHeader';
import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import { routes } from '@constants/routes';
import { getToken } from '@functions/authToken';
import { removeAuthToken } from '@functions/cookies';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { EditProfile } from '@screens/Profile/EditProfile';
import { ShowMyProfile } from '@screens/Profile/showMyProfile';
import { EditPetScreen } from '@screens/Pet/Edit/EditPetScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import DashedLine from 'react-native-dashed-line';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function M5Navigation() {

  return (
    <>
      <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
            headerLeft: null,
            animationEnabled: true
          })}
        >
          <Stack.Screen name='main screen m5' component={MainDrawer} />
          <Stack.Screen name={routes.AUTH} options={{
            cardStyle: {
              backgroundColor: 'transparent',
              height: '70%'
            },
            presentation: 'modal',
            gestureEnabled: true,
          }}>
          {() => <AuthScreen redirectAfterAuth={routes.SHOWMYPROFILE + 'm5'} />}
          </Stack.Screen>
      </Stack.Navigator>
    </>
  )
}
const MainDrawer = ({navigation}) => {
  const currentState = navigation.getParent().getState();
  const { index, routeNames} = currentState;
  const currentTab = routeNames[index];
  console.log(navigation.getState())

  const [open, setOpen] = useState(null);
  const handlePressFromChild = () => {
    navigation.getParent().dispatch(DrawerActions.toggleDrawer())
    setOpen(!open);
  };
    
  useEffect(() => {
    if(getToken() == null) {
      navigation.navigate(routes.AUTH)
    }
  }, [getToken()]);

  useFocusEffect(
    useCallback(() => {
      if(getToken() == null) {
        navigation.navigate(routes.AUTH)
      } 
    }, [getToken()])
  );

  return (
    <>
      <HeaderHamburger onPress={handlePressFromChild} open={open} />
      <Drawer.Navigator 
        initialRouteName="My Profile m5" 
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
        drawerContent={(props) => <CustomDrawerContent {...props}/>}
        >
        <Drawer.Screen name="My Profile m5" component={MainScreen} />
        <Drawer.Screen name="Soon m5" component={SoonScreen} />
      </Drawer.Navigator>
    </>
  )
}
const MainScreen = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null,
        })}
      >
        <Stack.Screen name={routes.SHOWMYPROFILE + 'm5'} component={ShowMyProfile} />
        <Stack.Screen name={routes.EDITPROFILE + 'm5'} component={EditProfile} />
        <Stack.Screen name={routes.SHOWPET + 'm5'} component={ShowPetScreen} />
        <Stack.Screen name={routes.EDITPET + 'm5'} component={EditPetScreen} />
        <Stack.Screen name={routes.PREVIEWPET + 'm5'} component={PreviewPet} />
      </Stack.Navigator>
    </>
  )
}

const HeaderHamburger = ({onPress, open}) => {
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7}}>
        <LogoHeader />
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

function CustomDrawerContent(props) {
  const { navigation } = props;

  const handleLogout = () => {
    removeAuthToken();
    navigation.navigate(routes.m1);
    navigation.closeDrawer(); 
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="My Profile"
        onPress={() => navigation.navigate('My Profile')}
      />
      <DrawerItem
        label="Soon"
        onPress={() => navigation.navigate('Soon')}
      />
      {/* Add other drawer items here if necessary */}

      <View style={{paddingLeft: 18, marginTop: 31}}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ fontSize: 15, color: 'red' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}



function SoonScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mzl Nzidha later</Text>
    </View>
  );
}