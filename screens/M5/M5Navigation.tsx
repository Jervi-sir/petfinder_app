/* Components */
import { LogoHeader } from '@components/LogoHeader';
import { Text } from '@components/Text';
/* Screens */
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { PreviewPet } from '@screens/Pet/Add/PreviewPet';
import { EditPetScreen } from '@screens/Pet/Edit/EditPetScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { EditProfile } from '@screens/M5/Profile/EditProfile';
import { ShowMyProfile } from '@screens/M5/Profile/showMyProfile';
/* packages */
import DashedLine from 'react-native-dashed-line';
import axios from 'axios';
import { Image } from 'expo-image';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect, useCallback, useContext } from 'react';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Platform, View } from 'react-native';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
/* constants */
import Api from '@utils/Api';
import { routes } from '@constants/routes';
import { colors } from '@constants/colors';
/* useContexts */
import { getToken, setToken } from '@functions/authToken';
import { getAuthToken, removeAuthToken } from '@functions/cookies';
import { AuthContext } from '@functions/AuthState';
import Routes from '@utils/Routes';
import { LoginScreen } from '@screens/Auth/LoginScreen';
import { RegisterScreen } from '@screens/Auth/RegisterScreen';
import { useAuth } from '@context/AuthContext';
import { useProfile } from '@context/ProfileContext';
/*--------------*/
import Dialog from "react-native-dialog";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const currentPlatform = Platform.OS;


export default function M5Navigation() {
  const { BearerToken } = useAuth();
  useEffect(() => {

  }, [BearerToken])
  const modal = {
    cardStyle: {
      backgroundColor: currentPlatform == 'android' ? 'rgba(0,0,0,0.5)' : 'transparent',
      height: '10%'
    },
    presentation: currentPlatform == 'android' ? 'transparentModal' : 'modal',
    gestureEnabled: false,
  }
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
          {
            BearerToken === null &&
            <>
              <Stack.Screen name={ Routes.LOGIN } component={LoginScreen} options={modal} />
              <Stack.Screen name={ Routes.REGISTER } component={RegisterScreen} options={modal} />
            </>
          }
      </Stack.Navigator>
    </>
  )
}

const MainDrawer = ({navigation}) => {
  const currentState = navigation.getParent().getState();
  const { index, routeNames} = currentState;
  const currentTab = routeNames[index];

  const { BearerToken } = useAuth();
  const { profileState } = useProfile();

  const [open, setOpen] = useState(null);
  const handlePressFromChild = () => {
    navigation.getParent().dispatch(DrawerActions.toggleDrawer())
    setOpen(!open);
  };

  useEffect(() => {
      if(BearerToken == null) {
        navigation.navigate(routes.LOGIN)
      }
  }, [BearerToken, profileState]);

  useFocusEffect(
    useCallback(() => {
      if(BearerToken == null) {
        navigation.navigate(routes.LOGIN)
      }
    }, [BearerToken, profileState])
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
        <Drawer.Screen name="My Profile" component={MainScreen} />
        <Drawer.Screen name="Soon" component={SoonScreen} />
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
  const { BearerToken, removeAuthToken } = useAuth();
  const { navigation } = props;
  const [logoutIsShown, setLogoutIsShown] = useState(false);
  const { updateProfile } = useProfile();
  
  const handleLogout = () => {
    handleCancel();
    axios.post(Api.Server + Api.Logout, {}, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + BearerToken } })
      .then(response => {
        removeAuthToken();
        updateProfile([]);
        navigation.closeDrawer(); 
        //navigation.navigate(routes.m1);
      }).catch(error => {
        console.error('Bearer ' + BearerToken);
      });
  };

  const handleCancel = () => {
    setLogoutIsShown(false);
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
        <TouchableOpacity 
          onPress={() => setLogoutIsShown(true)}
        >
          <Text style={{ fontSize: 15, color: 'red' }}>Logout</Text>
        </TouchableOpacity>
        <Dialog.Container visible={logoutIsShown} onBackdropPress={handleCancel}>
        <Dialog.Title>Do You Want to Logout</Dialog.Title>
        <View>
          <Dialog.Button style={{color: 'red'}} label="Yes" onPress={handleLogout} />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
        </View>
      </Dialog.Container>
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