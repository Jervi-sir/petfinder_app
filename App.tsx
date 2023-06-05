import { StatusBar } from '@components/StatusBar';
import { api } from '@constants/api';
import { AuthContext } from '@functions/AuthState';
import { getAuthToken, removeAuthToken } from '@functions/cookies';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '@screens/Navigations/AppNavigation';
import axios from 'axios';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';


export default function App() {
  const [sessionToken, setSessionToken] = useState({BearerToken: null}); //[fontsLoaded, setFontsLoaded
  //const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    //loadFonts();
    getAuthToken().then(e =>  { checkToken(e); })
      .catch(e => console.log(e));
  }, []);

  const checkToken = async (token) => {
      axios.get(api.Server + api.User, { headers: { Authorization: `Bearer ${token}` }})
      .then(response => {
        setSessionToken({BearerToken: token});
      })
      .catch( (error) => {
        if (error.response.status === 401) { removeAuthToken(); } 
        else {/** */}
      })
  };
  
  return (
    <AuthContext.Provider value={sessionToken}>
      <NavigationContainer>
        <StatusBar />
        <AppNavigation />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


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