import * as Location from 'expo-location';

export async function getLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }
}
export async function getUserLocation() {
  try {
    const location = await Location.getCurrentPositionAsync({});
    return location;
  } catch (error) {
    console.error(error);
  }
}

export const findWilaya = (location, WilayaCoord) => {
  const { latitude, longitude } = location.coords;
  for (const key in WilayaCoord) {
    const wilaya = WilayaCoord[key];
    if (
      latitude >= wilaya.minLat && latitude <= wilaya.maxLat &&
      longitude >= wilaya.minLng && longitude <= wilaya.maxLng
    ) {
      return wilaya;
    }
  }
  return null;
}