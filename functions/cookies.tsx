//import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeToken, setToken } from './authToken';
import * as SecureStore from 'expo-secure-store';


export const getAuthToken = async () => {
  const token = await SecureStore.getItemAsync('authToken');
  if(token) return token
  else return null
};

export const saveAuthToken = async (value) => {
  await SecureStore.setItemAsync('authToken', value);
  setToken(value);
  return true;
};

export const removeAuthToken = async () => {
  await SecureStore.deleteItemAsync('authToken');
  removeToken();
  return true;
};

