
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from '@constants/routes';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { SearchScreen } from '@screens/Search/SearchScreen';

const Stack = createStackNavigator();

export default function SearchNavigation() {

  return(
    <Stack.Navigator 
        initialRouteName={ routes.HOME }
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null
        })}
      >
      <Stack.Screen name={ routes.HOME } component={SearchScreen} />
      <Stack.Screen name={ routes.VIEWPET } component={ShowPetScreen} />
    </Stack.Navigator>
  )
}
