import { routes } from '@constants/routes';
import { DrawerActions, useFocusEffect, useNavigation, useNavigationContainerRef, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
import { EditPetScreen } from '@screens/Pet/Edit/EditPetScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { EditProfile } from '@screens/Profile/EditProfile';
import { ShowMyProfile } from '@screens/Profile/showMyProfile';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useEffect, useCallback, useContext } from 'react';
import { colors } from '@constants/colors';
import { TouchableOpacity, Platform } from 'react-native';
import { View } from 'react-native';
import DashedLine from 'react-native-dashed-line';
import { getToken, setToken } from '@functions/authToken';
import { getAuthToken, removeAuthToken } from '@functions/cookies';
import { LogoHeader } from '@components/LogoHeader';
import { Text } from '@components/Text';
import { Image } from 'expo-image';
import { AuthContext } from '@functions/AuthState';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const currentPlatform = Platform.OS;

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
              backgroundColor: currentPlatform == 'android' ? 'rgba(0,0,0,0.5)' : 'transparent',
              height: '10%'
            },
            presentation: currentPlatform == 'android' ? 'transparentModal' : 'modal',
            gestureEnabled: false,
          }}>
          {() => <AuthScreen redirectAfterAuth={routes.SHOWMYPROFILE + 'm5'} menuId={5} />}
          </Stack.Screen>
      </Stack.Navigator>
    </>
  )
}
const MainDrawer = ({navigation}) => {
  const currentState = navigation.getParent().getState();
  const { index, routeNames} = currentState;
  const currentTab = routeNames[index];

  const { BearerToken } = useContext(AuthContext);

  const [open, setOpen] = useState(null);
  const handlePressFromChild = () => {
    navigation.getParent().dispatch(DrawerActions.toggleDrawer())
    setOpen(!open);
  };

  useEffect(() => {
      if(BearerToken == null) {
        navigation.navigate(routes.AUTH)
      }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if(BearerToken == null) {
        navigation.navigate(routes.AUTH)
      }
    }, [])
  );

  return (
    <>
      <>
        <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7}}>
          <LogoHeader />
          <TouchableOpacity onPress={handlePressFromChild}>
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

      <Drawer.Navigator 
        initialRouteName="My Profile m5" 
        screenOptions={{
            headerShown: false,
            drawerPosition: 'right',
            drawerStyle: {
              backgroundColor: colors.background,
              width: 240,
            },
            drawerActiveBackgroundColor: 'rgba(91, 94, 151, 0.43)',
            drawerActiveTintColor: colors.menu,
            gestureHandlerProps: {
              maxPointers: 0
            }
        }}
        screenListeners={{
          state: (e) => {
            let isOpened = e.data.state.history.length == 1 ? false : true;
            setOpen(isOpened);
          },
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
        <Stack.Screen name={routes.SHOWMYPROFILE} component={ShowMyProfile} />
        <Stack.Screen name={routes.EDITPROFILE} component={EditProfile} />
        <Stack.Screen name={routes.SHOWPET} component={ShowPetScreen} />
        <Stack.Screen name={routes.EDITPET} component={EditPetScreen} />
        <Stack.Screen name={routes.PREVIEWPET} component={PreviewPet} />
      </Stack.Navigator>
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