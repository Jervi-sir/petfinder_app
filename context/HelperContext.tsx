import { formatRacesJson } from '@functions/helpers';
import React, { createContext, useContext, useEffect, useState } from 'react';

const HelperContext = createContext(null);


export const useHelper = () => {
  const context = useContext(HelperContext);
  if (!context) {
    throw new Error("useHelper must be used within a HelperProvider");
  }
  return context;
};


export const HelperProvider = ({ children }) => {
  const [racesHelper, SetRacesHelper] = useState(null);
  const [wilayasHelper, SetWilayasHelper] = useState(null);
  const [colorsHelper, SetColorsHelper] = useState(null);

  const updateRaces = (data) => {
    SetRacesHelper((data))
  };

  const updateWilaya = (data) => {
    SetWilayasHelper((data))
  };

  const updateColors = (data) => {
    SetColorsHelper((data))
  };

  const value = {
    racesHelper,
    updateRaces,
    wilayasHelper,
    updateWilaya,
    colorsHelper,
    updateColors,
  };



  return (
    <HelperContext.Provider value={value}>
      {children}
    </HelperContext.Provider>
  );
};
