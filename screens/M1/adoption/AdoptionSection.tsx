/* Components */
/* Screens */
import { RaceScreen } from '../RaceScreen';
/* packages */
import { Image } from 'expo-image';
import { View, Text, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
/* constants */
import { icons } from '@constants/icons';
import { colors } from '@constants/colors';
/* useContexts */

/*--------------*/
const Tab = createMaterialTopTabNavigator();

export function AdoptionSection() {
  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={{ height: 800 }}>
        <Tab.Navigator
          screenOptions={{
            lazy: true,
            tabBarScrollEnabled: true,
            tabBarContentContainerStyle: { alignItems: 'flex-start', alignContent: 'flex-start' },
            tabBarStyle: { backgroundColor: 'transparent', height: 71, alignItems: 'flex-start', marginTop: -5, marginLeft: -20 },
            tabBarIndicatorStyle: { backgroundColor: colors.menu, height: 0 },
            tabBarItemStyle: { width: 69 },
            animationEnabled: true,
            swipeEnabled: false,
          }}
        >
          <Tab.Screen
            name="Pets"
            component={RaceScreen}
            initialParams={{ raceName: 'Pets', raceId: 0 }}
            options={{
              tabBarLabel: () => { return null },
              tabBarIcon: ({ focused }) => (
                <View style={[styles.filterButton, { backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'rgba(51, 58, 90, 0.0)' }]}>
                  <Image style={{ width: focused ? 40 : 55, height: focused ? 40 : 55 }} source={icons.LOGO} />
                </View>
              )
            }}
          />
          {TabScreenFactory('Cat', 'CATFILTER', 1, 'Cats')}
          {TabScreenFactory('Dog', 'DOGFILTER', 2, 'Dogs')}
          {TabScreenFactory('Bird', 'BIRDFILTER', 3, 'Birds')}
          {TabScreenFactory('Horse', 'HORSEFILTER', 4, 'Horses')}
          {TabScreenFactory('Other', 'FARMFILTER', 5, 'Others')}
        </Tab.Navigator>
      </View>
    </View>
  );
}

const TabScreenFactory = (name, iconName, raceId, raceName) => {
  return (
    <Tab.Screen
      name={name}
      component={RaceScreen}
      initialParams={{ raceName: raceName, raceId: raceId }}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => (
          <View style={[styles.filterButton, { backgroundColor: focused ? 'rgba(51, 58, 90, 0.3)' : 'white' }]}>
            <Image style={{ width: 40, height: 40 }} source={icons[iconName]} />
            <Text style={{ color: focused ? colors.white : colors.menu }}>{name}</Text>
          </View>
        ),
      }}
    />
  );
};

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
  