import {View, Text, Image, TextInput, ScrollView, Animated, StyleSheet} from 'react-native'
import { useState,useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { AllScreen } from './AllScreen';
import { RaceScreen } from './RaceScreen';
import { LogoHeader } from '@components/LogoHeader';
import { HeaderWithTitle } from '@components/HeaderWithTitle';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  const [ selectedTab, setSelectedTab ] = useState('');

  const handleSelectedTab = name => {
    setSelectedTab(name)
  };

  return (
    <View style={{backgroundColor: colors.background}}>
      {/* <HeaderWithTitle title={'New ' + selectedTab} /> */}
      {/* pet filter */}
      <View style={{height: 800}}>
        <Tab.Navigator 
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle:{ backgroundColor: colors.menu, height: 0, } ,
          tabBarItemStyle: {width: 71, },
          tabBarContentContainerStyle:{alignItems: 'flex-start' , alignContent: 'flex-start',   },
          tabBarStyle: {backgroundColor:'transparent', height: 71, alignItems: 'flex-start'},
          animationEnabled: true,
          swipeEnabled: false,
        }}
        >
          <Tab.Screen 
            name="Pets" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'rgba(51, 58, 90, 0.0)'}]}>
                  <Image style={{width: focused ? 45 : 55, height: focused ? 45 : 55}} source={icons.LOGO} />
                </View>
              )  }} 
          >
            {() => <AllScreen setTabName={handleSelectedTab} raceName={"Pets"}/>}
          </Tab.Screen>
          <Tab.Screen 
            name="Cat" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Image style={{width: 45, height: 45}} source={icons.CATFILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Cat</Text>
                </View>
              )  }}
          >
          {() => <RaceScreen raceId="1" setTabName={handleSelectedTab} raceName={"Cats"}/>}
          </Tab.Screen>
          <Tab.Screen 
            name="Dog" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Image style={{width: 45, height: 45}} source={icons.DOGFILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Dog</Text>
                </View>
              )  }}
          >
          {() => <RaceScreen raceId="2" setTabName={handleSelectedTab} raceName={"Dog"}/>}
          </Tab.Screen>
          <Tab.Screen 
            name="Bird" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Image style={{width: 45, height: 45}} source={icons.BIRDFILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Bird</Text>
                </View>
              )  }}
          >
          {() => <RaceScreen raceId="3" setTabName={handleSelectedTab} raceName={"Bird"}/>}
          </Tab.Screen>
          <Tab.Screen 
            name="Horse" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                  <Image style={{width: 45, height: 45}} source={icons.HORSEFILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Horse</Text>
                </View>
              )}}
          >
          {() => <RaceScreen raceId="4" setTabName={handleSelectedTab} raceName={"Horse"}/>}
          </Tab.Screen>
          <Tab.Screen 
            name="Other" 
            options={{
              tabBarLabel: () => {return null},
              tabBarIcon: ({focused}) => (
                <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white',}]}>
                  <Image style={{width: 45, height: 45}} source={icons.FARMFILTER} />
                  <Text style={{color: focused ? colors.white : colors.menu}}>Other</Text>
                </View>
              )  }}
            >
            {() => <RaceScreen raceId="5" setTabName={handleSelectedTab} raceName={"Other"}/>}
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


const HeaderWithSearch = () => {
  return (
    <Animated.View style={[styles.inputStyle2]}>
      <LogoHeader />
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
  )
}

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
