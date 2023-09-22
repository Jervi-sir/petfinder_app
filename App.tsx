/* Components */
import { StatusBar } from '@components/StatusBar';
/* Screens */
import MenuNavigation from '@screens/MenuNavigation';
/* packages */
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* constants */
import Routes from '@utils/Routes';
/* useContexts */
import { AuthProvider, useAuth } from '@context/AuthContext';
import { TestScreen } from '@screens/TestScreen';
/*--------------*/
import { TouchableOpacity,Text,View } from 'react-native';
import { ProfileProvider } from '@context/ProfileContext';

export default function App() {

  return (
      <ProfileProvider>
    <AuthProvider>
        <NavigationContainer>
          <StatusBar />
          <AppNavigation />
        </NavigationContainer>
    </AuthProvider>
      </ProfileProvider>
  );
}

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { BearerToken } = useAuth();

  return(
    <>
    {/*
      <View>
            <TouchableOpacity 
            style={{height: 50, backgroundColor: 'red'}}
            onPress={() => console.log(BearerToken)}
            >
              <Text>test bearer token</Text>
            </TouchableOpacity>
          </View>
           */}
      <Stack.Navigator 
        screenOptions={() => ({
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
          animationTypeForReplace: 'push',
        })}
      >
        <Stack.Screen name={ Routes.MENU } component={MenuNavigation} />
      </Stack.Navigator>
    </>
      
  )
}

const config = {
  animation: 'spring', config: { stiffness: 1000, damping: 500, mass: 3, overshootClamping: true, restDisplacementThreshold: 0.01, restSpeedThreshold: 0.01,},
};
const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Black': require('@assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('@assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Light': require('@assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Thin': require('@assets/fonts/Poppins-Thin.ttf'),
  });
  //setFontsLoaded(true);
};
