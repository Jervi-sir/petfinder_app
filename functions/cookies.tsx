import { cookies } from '@constants/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';

//getAuthToken().then(e => console.log(e))
export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem(cookies.AUTH);
  if(token) return token
  else return null
};

//saveAuthToken('bruhVerj');
export const saveAuthToken = async (value) => {
  await AsyncStorage.setItem(cookies.AUTH, value);
  return true;
};

export const removeAuthToken = async () => {
  await AsyncStorage.removeItem(cookies.AUTH);
  return true;
};

