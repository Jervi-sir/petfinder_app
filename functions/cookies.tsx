import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeToken, setToken } from './authToken';

//getAuthToken().then(e => console.log(e))
export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem('authToken');
  if(token) return token
  else return null
  //return 'jervi'
};

//saveAuthToken('bruhVerj');
export const saveAuthToken = async (value) => {
  await AsyncStorage.setItem('authToken', value);
  setToken(value);
  return true;
};

export const removeAuthToken = async () => {
  await AsyncStorage.removeItem('authToken');
  removeToken();
  return true;
};

