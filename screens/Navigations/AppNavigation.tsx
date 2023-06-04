import { createStackNavigator } from '@react-navigation/stack';
import { routes } from '@constants/routes';
import MenuNavigation from './MenuNavigation';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  
  return(
    <>
      <Stack.Navigator 
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
          animationTypeForReplace: 'push',
        })}
      >
        <Stack.Screen name={ routes.MENU } component={MenuNavigation} />
      </Stack.Navigator>
    </>
      
  )
}