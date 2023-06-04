import { routes } from '@constants/routes';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import { SearchScreen } from '@screens/Search/SearchScreen';
import { ShowPetScreen } from '@screens/Pet/ShowPetScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@components/Text';
import { getToken } from '@functions/authToken';
import { getAuthToken } from '@functions/cookies';

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