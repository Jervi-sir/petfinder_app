import { StatusBar } from '@components/StatusBar';
import { api } from '@constants/api';
import { getAuthToken, removeAuthToken } from '@functions/cookies';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '@screens/Navigations/AppNavigation';
import axios from 'axios';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Black': require('@assets/fonts/Poppins-Black.ttf'),
      'Poppins-Bold': require('@assets/fonts/Poppins-Bold.ttf'),
      'Poppins-Light': require('@assets/fonts/Poppins-Light.ttf'),
      'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Thin': require('@assets/fonts/Poppins-Thin.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    //loadFonts();
    getAuthToken()
      .then(e =>  { 
        checkToken(e);
      })
      .catch(e => console.log(e));
  }, []);

  const checkToken = async (token) => {
    try {
      const response = await axios.get(api.Server + api.User, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Token is valid');
    } catch (error) {
      if (error.response.status === 401) {
        removeAuthToken();
      } else {
        //console.error(error);
      }
    }
  };
  
  return (
    <NavigationContainer>
      <StatusBar />
      <AppNavigation />
    </NavigationContainer>
  );
}

