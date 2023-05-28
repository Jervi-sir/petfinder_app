import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PetTabNavigator from './PetTabNavigator';

const TestScreen = () => {
  return (
    <NavigationContainer>
      <PetTabNavigator />
    </NavigationContainer>
  );
};

export default TestScreen;
