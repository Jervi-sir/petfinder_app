import { colors } from '@constants/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { RaceScreen } from './RaceScreen';
import { icons } from '@constants/icons';

const Tab = createMaterialTopTabNavigator();

const AllTab = () => { return (<RaceScreen raceId={0} raceName='Pets' />) }
const CatTab = () => { return (<RaceScreen raceId={1} raceName='Cats' />) }
const DogTab = () => { return (<RaceScreen raceId={2} raceName='Dogs' />) }
const BirdTab = () => { return (<RaceScreen raceId={3} raceName='Birds' />) }
const HorseTab = () => { return (<RaceScreen raceId={4} raceName='Horses' />) }
const OtherTab = () => { return (<RaceScreen raceId={5} raceName='Others' />) }

export function AdoptionSection() {
    return (
        <View style={{backgroundColor: colors.background}}>
        {/* <HeaderWithTitle title={'New ' + selectedTab} /> */}
        <View style={{height: 800}}>
          <Tab.Navigator 
          screenOptions={{
            lazy: true,
            tabBarScrollEnabled: true,
            tabBarIndicatorStyle:{ backgroundColor: colors.menu, height: 0, } ,
            tabBarItemStyle: {width: 71, },
            tabBarContentContainerStyle:{alignItems: 'flex-start' , alignContent: 'flex-start'},
            tabBarStyle: {backgroundColor:'transparent', height: 71, alignItems: 'flex-start', marginTop: -5},
            animationEnabled: true,
            swipeEnabled: false,
            
          }}
  
          >
            <Tab.Screen 
              name="Pets" 
              component={AllTab}
              options={{
                tabBarLabel: () => {return null},
                tabBarIcon: ({focused}) => (
                  <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'rgba(51, 58, 90, 0.0)'}]}>
                    <Image style={{width: focused ? 40 : 55, height: focused ? 40 : 55}} source={icons.LOGO} />
                  </View>
                )  }} 
            />
            <Tab.Screen 
              name="Cat" 
              component={CatTab}
              options={{
                tabBarLabel: () => {return null},
                tabBarIcon: ({focused}) => (
                  <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                    <Image style={{width: 40, height: 40}} source={icons.CATFILTER} />
                    <Text style={{color: focused ? colors.white : colors.menu}}>Cat</Text>
                  </View>
                )  }}
            />
            <Tab.Screen 
              name="Dog" 
              component={DogTab}
              options={{
                tabBarLabel: () => {return null},
                tabBarIcon: ({focused}) => (
                  <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                    <Image style={{width: 40, height: 40}} source={icons.DOGFILTER} />
                    <Text style={{color: focused ? colors.white : colors.menu}}>Dog</Text>
                  </View>
                )  }}
            />
            <Tab.Screen 
              name="Bird" 
              component={BirdTab}
              options={{
                tabBarLabel: () => {return null},
                tabBarIcon: ({focused}) => (
                  <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                    <Image style={{width: 40, height: 40}} source={icons.BIRDFILTER} />
                    <Text style={{color: focused ? colors.white : colors.menu}}>Bird</Text>
                  </View>
                )  }}
            />
  
            <Tab.Screen 
              name="Horse" 
              component={HorseTab}
              options={{
                tabBarLabel: () => {return null},
                tabBarIcon: ({focused}) => (
                  <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white'}]}>
                    <Image style={{width: 40, height: 40}} source={icons.HORSEFILTER} />
                    <Text style={{color: focused ? colors.white : colors.menu}}>Horse</Text>
                  </View>
                )}}
            />
           
            <Tab.Screen 
              name="Other" 
              component={OtherTab}
              options={{
                tabBarLabel: () => {return null},
                tabBarIcon: ({focused}) => (
                  <View style={[styles.filterButton, {backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white',}]}>
                    <Image style={{width: 40, height: 40}} source={icons.FARMFILTER} />
                    <Text style={{color: focused ? colors.white : colors.menu}}>Other</Text>
                  </View>
                )  }}
            />
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
  