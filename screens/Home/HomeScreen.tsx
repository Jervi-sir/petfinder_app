import {View, Text, TextInput, ScrollView, Animated, StyleSheet, TouchableOpacity} from 'react-native'
import { useState, useRef, useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'expo-image';

import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { RaceScreen } from './RaceScreen';
import { LogoHeader } from '@components/LogoHeader';
import { AdoptionSection } from './AdoptionSection';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  return (
    <>

      <Tab.Navigator 
        screenOptions={{
          lazy: true,
          tabBarIndicatorStyle:{ backgroundColor: colors.menu, height: 2} ,
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold', textTransform: 'none', color: colors.menu},
          tabBarItemStyle: { height: 42},
          animationEnabled: true,
          swipeEnabled: false,
        }}
      >
        <Tab.Screen name="Adoption" component={AdoptionSection}/>
        <Tab.Screen name="Lost" component={AdoptionSection}/>
      </Tab.Navigator>
    </>
  )
}

