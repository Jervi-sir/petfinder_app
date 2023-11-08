import { View, TouchableOpacity, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import { colors } from '@constants/colors';
import { Linking, Platform } from 'react-native';
import { useLocation } from '@context/LocationContext';

export const LocationPermissionButton = () => {
  const { setIgnoreLocationPermissions } = useLocation();

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Please enable `location` from the settings to use  features.',
          [{ text: 'OK' }]
        );
      } else {
        // Permission granted, you can fetch the location here or inform the user.
        Alert.alert('Permission Granted', 'Location permission has been granted.');
      }
    } catch (error) {
      console.error('Error while requesting location permission', error);
    }
  };

  return (
    <View style={{ marginHorizontal: 40, marginVertical: 7, backgroundColor: colors.white, padding: 15, borderRadius: 7, borderColor: colors.background, borderWidth: 5 }}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.button,
          padding: 15,
          borderRadius: 7,
          alignItems: 'center',
        }}
        onPress={openSettings}
      >
        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>If no results is Shown, Please Enable Location Permission</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{
          padding: 15,
          borderRadius: 7,
          alignItems: 'center',
        }}
        onPress={() => {
          setIgnoreLocationPermissions(true);
        }}
      >
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginRight: 10, }}>or</Text>
          <Text style={{ color: colors.menu, fontSize: 16, textAlign: 'center', textDecorationLine: 'underline' }}>Continue without Location</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


const openSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings(); // For Android, use openSettings
  }
};

