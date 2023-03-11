import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PetScreen from './PetScreen';
const Tab = createMaterialTopTabNavigator();

const PetTabNavigator = () => {
  return (
   <>
    <Tab.Navigator>
      <Tab.Screen name="All" component={PetScreen} initialParams={{ type: 'all' }} />
      <Tab.Screen name="Cats" component={PetScreen} initialParams={{ type: 'cat' }} />
      <Tab.Screen name="Dogs" component={PetScreen} initialParams={{ type: 'dog' }} />
      <Tab.Screen name="Horses" component={PetScreen} initialParams={{ type: 'horse' }} />
      <Tab.Screen name="Others" component={PetScreen} initialParams={{ type: 'other' }} />
    </Tab.Navigator></>

  );
};

export default PetTabNavigator;
