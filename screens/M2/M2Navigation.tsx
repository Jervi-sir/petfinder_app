/* Components */
/* Screens */
import { SearchScreen } from '@screens/M2/SearchScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
/* packages */
import { createStackNavigator } from '@react-navigation/stack';
/* constants */
import { routes } from '@constants/routes';
import Routes from '@utils/Routes';
/* useContexts */
/*--------------*/

const Stack = createStackNavigator();

export default function M2Navigation() {
  
  return (
    <>
      <Stack.Navigator 
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null,
          animationEnabled: true
        })}
      >
        <Stack.Screen name={ Routes.SearchScreen } component={SearchScreen} />
        <Stack.Screen name={ Routes.ShowPetScreen } component={ShowPetScreen} />
      </Stack.Navigator>
    </>
  )
}