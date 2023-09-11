
/* Components */
/* Screens */
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { SearchScreen } from '@screens/M2/SearchScreen';
/* packages */
import { createStackNavigator } from '@react-navigation/stack';
/* constants */
import { routes } from '@constants/routes';
/* useContexts */
/*--------------*/

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
