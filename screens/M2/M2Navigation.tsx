/* Components */
/* Screens */
import { SearchScreen } from '@screens/M2/SearchScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
/* packages */
import { createStackNavigator } from '@react-navigation/stack';
/* constants */
import { routes } from '@constants/routes';
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
        <Stack.Screen name={ routes.HOME } component={SearchScreen} />
        <Stack.Screen name={ routes.VIEWPET } component={ShowPetScreen} />
      </Stack.Navigator>
    </>
  )
}