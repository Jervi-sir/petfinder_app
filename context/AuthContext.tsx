import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KeyNames from '../utils/KeyNames';
import axios from 'axios';
import Api from '../utils/Api';
import { useProfile } from './ProfileContext';

const AuthContext = createContext(null);

const AUTH_KEY = KeyNames.authToken;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [BearerToken, setToken] = useState(null);
  const { updateProfile } = useProfile();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem(AUTH_KEY);
      
      if (storedToken) {
        // Validate the token by making an API call
        try {
          const response = await axios.get(Api.Server + Api.validate_token, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          
          if (response.status === 200) {
            setToken(storedToken);
            updateProfile(response.data.user_auth_info);

            console.log('token is valid: ' + storedToken)
          }
        } catch (error) {
          // Handle the error as you'd like, e.g., by removing the invalid token
          console.error('Token validation failed:', error);
          await AsyncStorage.removeItem(AUTH_KEY);
        }
      }
    };
  
    fetchToken();
  }, []);

  // A function to set the token and also save it to AsyncStorage
  const saveAuthToken = async (newToken) => {
    setToken(newToken);
    await AsyncStorage.setItem(AUTH_KEY, newToken);
  };

  const removeAuthToken = async () => {
    setToken(null);
    await AsyncStorage.removeItem(AUTH_KEY);
  }

  const value = {
    BearerToken,
    saveAuthToken,
    removeAuthToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
