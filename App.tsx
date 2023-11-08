/* Components */
import { StatusBar } from '@components/StatusBar';
/* Screens */
import MenuNavigation from '@screens/MenuNavigation';
/* packages */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* constants */
import Routes from '@utils/Routes';
/* useContexts */
import { AuthProvider, useAuth } from '@context/AuthContext';
/*--------------*/
import { ProfileProvider } from '@context/ProfileContext';
import { HelperProvider } from '@context/HelperContext';
import { useEffect } from 'react';
import WilayaCoord from '@utils/WilayaCoord';
import { findWilaya, getLocationPermission, getUserLocation } from '@functions/location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationProvider } from '@context/LocationContext';

export default function App() {
  return (
    <HelperProvider>
      <LocationProvider>
        <ProfileProvider>
          <AuthProvider>
            <NavigationContainer>
              <StatusBar />
              <AppNavigation />
            </NavigationContainer>
          </AuthProvider>
        </ProfileProvider>
      </LocationProvider>
    </HelperProvider>
  );
}

const Stack = createStackNavigator();

const AppNavigation = () => {
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
