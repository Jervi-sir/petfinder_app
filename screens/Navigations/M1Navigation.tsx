import { routes } from '@constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen } from '@screens/Auth/AuthScreen';
import { HomeScreen } from '@screens/Home/HomeScreen';
import { MessageScreen } from '@screens/Message/messageScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { ShowProfile } from '@screens/Profile/ShowProfile';

const Stack = createStackNavigator();
export default function M1Navigation() {
  return (
    <>
      <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
            headerLeft: null,
            animationEnabled: true
          })}
        >
          <Stack.Screen name='main screen m1' component={MainScreen} />
          <Stack.Screen name={routes.AUTH} options={{
            cardStyle: {
              backgroundColor: 'transparent',
              height: '70%'
            },
            presentation: 'modal',
            gestureEnabled: false,
          }}>
            {() => <AuthScreen />}
          </Stack.Screen>
      </Stack.Navigator>
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
          <Stack.Screen name={routes.HOME} component={HomeScreen} />
          <Stack.Screen name={routes.VIEWPET} component={ShowPetScreen} />
          <Stack.Screen name={routes.SHOWPROFILE} component={ShowProfile} />
          <Stack.Screen name={routes.MESSAGELIST} component={MessageScreen} />
      </Stack.Navigator>
    </>
  )
}