import { formatRacesJson, formatWilayasJson } from '@functions/helpers';
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import WilayaCoord from '@utils/WilayaCoord';

const HelperContext = createContext(null);


export const useHelper = () => {
  const context = useContext(HelperContext);
  if (!context) {
    throw new Error("useHelper must be used within a HelperProvider");
  }
  return context;
};


export const HelperProvider = ({ children }) => {
  const [wilayaHelper, SetWilayaHelper] = useState(null);
  const [userWilaya, setUserWilaya] = useState(null);
  const [racesHelper, SetRacesHelper] = useState(null);

  const updateWilayaNumber = (data) => {
    //SetWilayaHelper(formatWilayasJson(data))
    setUserWilaya(data)
  };

  const updateRaces = (data) => {
    SetRacesHelper(formatRacesJson(data))
  };

  const value = {
    wilayaHelper,
    racesHelper,
    updateWilayaNumber,
    updateRaces,
    userWilaya,
  };

  useEffect(() => {
    getLocationPermission();
    getUserLocation()
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
  }, []);

  return (
    <HelperContext.Provider value={value}>
      {children}
    </HelperContext.Provider>
  );
};


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