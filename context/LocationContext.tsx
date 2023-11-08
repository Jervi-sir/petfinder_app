import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import WilayaCoord from '@utils/WilayaCoord';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LocationContext = createContext(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [wilayaHelper, SetWilayaHelper] = useState(null);
  const [userWilaya, setUserWilaya] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true); // New state for loading
  const [ignoreLocationPermissions, setIgnoreLocationPermissions] = useState(false);

  const updateWilayaNumber = async (data) => {
    const storedWilaya = await AsyncStorage.getItem('userWilaya');
    setUserWilaya(data);
    if (storedWilaya !== data) {
      await AsyncStorage.setItem('userWilaya', data.toString());
    }
    setIsLocationLoading(false); 
  };

  const getWilayaNumberAsync = async () => {
    const storedWilaya = await AsyncStorage.getItem('userWilaya');
    setIsLocationLoading(false); 
    return storedWilaya;
  };


  const value = {
    wilayaHelper,
    updateWilayaNumber,
    userWilaya,
    isLocationLoading,
    getWilayaNumberAsync,
    ignoreLocationPermissions,
    setIgnoreLocationPermissions
  };

  useEffect(() => {
    setIsLocationLoading(true); // Start loading
    // Load wilaya from AsyncStorage on mount
    AsyncStorage.getItem('userWilaya')
      .then((storedWilaya) => {
        if (storedWilaya) {
          setUserWilaya(storedWilaya);
        } else {
          getLocationPermission()
            .then(getUserLocation)
            .then((location) => {
              const userWilaya = findWilaya(location, WilayaCoord);
              if (userWilaya) {
                const userWilayaCode = userWilaya.code;
                updateWilayaNumber(userWilayaCode);
              }
            })
            .catch((error) => {
              console.error("Error fetching user location:", error);
            });
        }
        setIsLocationLoading(false); 
      });
  }, []);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );

};


async function getLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }
}
async function getUserLocation() {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeout: 5000, // Wait for 5 seconds
      maximumAge: 1000, // Accept no older than 1 second cache
    });
    return location;
  } catch (error) {
    console.error(error);
  }
}

const findWilaya = (location, WilayaCoord) => {
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
