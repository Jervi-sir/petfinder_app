import { createStackNavigator } from '@react-navigation/stack';
import { routes } from '@constants/routes';

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <>
      <Stack.Navigator 
          screenOptions={() => ({
            headerShown: false,
            headerLeft: null,
            animationEnabled: true
          })}
        >
          <Stack.Screen name={ routes.LOGIN } component={LoginScreen} />
          <Stack.Screen name={ routes.REGISTER } component={LoginScreen} />
        </Stack.Navigator>
    </>
  )
}

const LoginScreen = () => {
  return(
    <></>
  )
}