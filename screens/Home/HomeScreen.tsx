import {View, Text, Image, TextInput, ScrollView, Animated, StyleSheet} from 'react-native'
import { useState,useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { AllScreen } from './AllScreen';
import { RaceScreen } from './RaceScreen';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {

  return (
    <View style={{backgroundColor: colors.background}}>
      <Animated.View style={[styles.inputStyle2]}>
        <Image style={{width: 69 - 20, height: 69 - 20}} source={icons.LOGO} />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{flexDirection: 'row', flex:1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 7}}>
            <TextInput
              style={{ height: 40, borderColor: 'gray',flex: 1 ,paddingLeft: 5 }}
              placeholder="Find your Favorite Pet"
              onChangeText={text => {}}
            />
            <Image style={{width: 40, height: 40}} source={icons.SEARCH} />
          </View>
        </ScrollView>
        {/* Dotted Line */}
      </Animated.View>

      {/* pet filter */}
      <View style={{height: 800}}>
        <Tab.Navigator 
        
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle:{ backgroundColor: colors.menu, height: 0, } ,
          tabBarItemStyle: {width: 71},
          tabBarContentContainerStyle:{alignItems: 'flex-start' , alignContent: 'flex-start' },
          tabBarStyle: {backgroundColor:'transparent', height: 71, alignItems: 'flex-start' },
        }}
        >
          <Tab.Screen 
            name="All" 
            component={AllScreen} 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Text style={{color: focused ? colors.white : colors.menu}}>All</Text>
                </View>
              )  }} 
          />
          <Tab.Screen 
            name="Cat" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Image style={{width: 45, height: 45}} source={icons.FILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Cat</Text>
                </View>
              )  }}
          >
          {() => <RaceScreen raceId="1" />}
          </Tab.Screen>
          <Tab.Screen 
            name="Dog" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Image style={{width: 45, height: 45}} source={icons.FILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Dog</Text>
                </View>
              )  }}
          >
          {() => <RaceScreen raceId="2" />}
          </Tab.Screen>
          <Tab.Screen 
            name="Bird" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Image style={{width: 45, height: 45}} source={icons.FILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Bird</Text>
                </View>
              )  }}
          >
          {() => <RaceScreen raceId="3" />}
          </Tab.Screen>
          <Tab.Screen 
            name="Horse" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Image style={{width: 45, height: 45}} source={icons.FILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Horse</Text>
                </View>
              )  }}
          >
          {() => <RaceScreen raceId="4" />}
          </Tab.Screen>
          <Tab.Screen 
            name="Other" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Image style={{width: 45, height: 45}} source={icons.FILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Other</Text>
                </View>
              )  }}
            >
            {() => <RaceScreen raceId="5" />}
            </Tab.Screen>

        </Tab.Navigator>
      </View>
      {/* title */}
      
      {/* cards result list */}
    
    </View>
  )
}

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: 'white', 
    borderRadius: 10, 
    width: 69-10, 
    height: 69-10, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  inputStyle1: {
    flexDirection: 'column', 
    paddingRight: 10, 
    paddingLeft: 10
  },
  titleStyle1: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  inputStyle2: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingRight: 10, 
    paddingLeft: 10
  },
});


const HeaderExample = () => {
  const [userDidInput, setUserDidInput] = useState(false);

  let currentInputStyle = !userDidInput ? styles.inputStyle1 : styles.inputStyle2;
  
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [h_max_height, H_MAX_HEIGHT] = useState(150);
  const H_MIN_HEIGHT = 0;
  const [h_scroll_distance, H_SCROLL_DISTANCE] = useState(h_max_height - H_MIN_HEIGHT);
  
  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, h_scroll_distance],
    outputRange: [h_max_height, H_MIN_HEIGHT],
    extrapolate: "clamp"
  });
  return (
    <Animated.View style={[currentInputStyle,{ height: !userDidInput ? headerScrollHeight : h_max_height }]}>
        <Image style={{width: 69, height: 69}} source={icons.LOGO} />
        {!userDidInput ? (<Text style={styles.titleStyle1}>Find your Favorite Pet</Text>) : ''}
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{flexDirection: 'row', flex:1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 7}}>
            <TextInput
              style={{ height: 40, borderColor: 'gray',flex: 1 ,paddingLeft: 5 }}
              placeholder="Insert your text!"
              onChangeText={text => {
                setUserDidInput(true);
                H_MAX_HEIGHT(69);
              }}
            />
            <Image style={{width: 40, height: 40}} source={icons.SEARCH} />
          </View>
        </ScrollView>
        {/* Dotted Line */}
      </Animated.View>
  )
}
