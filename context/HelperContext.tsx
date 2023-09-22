import { formatRacesJson, formatWilayasJson } from '@functions/helpers';
import React, { createContext, useContext, useState } from 'react';

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
  const [racesHelper, SetRacesHelper] = useState(null);

  const updateWilaya = (data) => {
    SetWilayaHelper(formatWilayasJson(data))
  };

  const updateRaces = (data) => {
    SetRacesHelper(formatRacesJson(data))
  };

  const value = {
    wilayaHelper,
    racesHelper,
    updateWilaya,
    updateRaces
  };

  return (
    <HelperContext.Provider value={value}>
      {children}
    </HelperContext.Provider>
  );
};

