import { routes } from '@constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@screens/Home/HomeScreen';
import { MessageScreen } from '@screens/Message/messageScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { ShowProfile } from '@screens/Profile/ShowProfile';
import { SearchScreen } from '@screens/Search/SearchScreen';
const Stack = createStackNavigator();
export default function M1Navigation() {
  return (
    <>
    <Stack.Navigator 
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null,
        })}
      >
        <Stack.Screen name={routes.HOME} component={HomeScreen} />
        <Stack.Screen name={routes.SEARCH} component={SearchScreen} />
        <Stack.Screen name={routes.VIEWPET} component={ShowPetScreen} />
        <Stack.Screen name={routes.SHOWPROFILE} component={ShowProfile} />
        <Stack.Screen name={routes.MESSAGELIST} component={MessageScreen} />
      </Stack.Navigator>
    </>
  )
}