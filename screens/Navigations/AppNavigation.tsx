import { createStackNavigator } from '@react-navigation/stack';
import { routes } from '@constants/routes';
import MenuNavigation from './MenuNavigation';

const Stack = createStackNavigator();

export default function AppNavigation() {

  return(
    <>
      <Stack.Navigator 
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null,
          animationEnabled: true
        })}
      >
        <Stack.Screen name={ routes.MENU } component={MenuNavigation} />
      </Stack.Navigator>
    </>
      
  )
}