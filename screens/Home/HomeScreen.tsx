import {View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, FlatList, ScrollView, Animated, StyleSheet} from 'react-native'
import { CardHome } from './CardHome'
import { MasonryFlashList } from "@shopify/flash-list";
import { useState,useRef } from 'react';
import { COLORS } from '../../constants';
import DashedLine from 'react-native-dashed-line';
import { StatusBar } from '../../components/StatusBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  const [userDidInput, setUserDidInput] = useState(false);
  const data = [1, 2, 3, 4, 5, 6, 7];

  let currentInputStyle = !userDidInput ? styles.inputStyle1 : styles.inputStyle2;
  
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [h_max_height, H_MAX_HEIGHT] = useState(150);
  const H_MIN_HEIGHT = 0;
  const [h_scroll_distance, H_SCROLL_DISTANCE] = useState(h_max_height - H_MIN_HEIGHT);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animateInput = () => {
    Animated.timing(fadeAnim, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, h_scroll_distance],
    outputRange: [h_max_height, H_MIN_HEIGHT],
    extrapolate: "clamp"
  });

  return (
    <View style={{backgroundColor: COLORS.background}}>
      <StatusBar />
      <Animated.View style={[currentInputStyle,{ height: !userDidInput ? headerScrollHeight : h_max_height }]}>
        <Image style={{width: 69, height: 69}} source={require('../../assets/icons/logo.png')} />
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
            <Image style={{width: 40, height: 40}} source={require('../../assets/icons/search.png')} />
          </View>
        </ScrollView>
        {/* Dotted Line */}

      {/* pet filter */}
      <View style={{minHeight: 600}}>
        <Tab.Navigator
          screenOptions={{ 
            tabBarScrollEnabled: true,
            tabBarIndicatorStyle:{
              backgroundColor: COLORS.menu,
              height:2,
            } ,
            tabBarContentContainerStyle: {marginHorizontal: 10}
          }}
          
          >          
          <Tab.Screen name="all"children={() => <ResultScreen data={data} />} 
            options={{ 
              tabBarLabel:() => {return null}, 
              tabBarIcon: ({focused}) => (
                <>
                  <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
                  <Text>Cat</Text>
                </>
              )  }} 
          />  
          <Tab.Screen name="cat"children={() => <ResultScreen data={data} />} 
            options={{ 
              tabBarLabel:() => {return null}, 
              tabBarIcon: ({focused}) => (
                <>
                  <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
                  <Text>Cat</Text>
                </>
              )  }} 
          />    
          <Tab.Screen name="dog"children={() => <ResultScreen data={data} />} 
            options={{ 
              tabBarLabel:() => {return null}, 
              tabBarIcon: ({focused}) => (
                <>
                  <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
                  <Text>Cat</Text>
                </>
              )  }} 
          />  
          <Tab.Screen name="horse"children={() => <ResultScreen data={data} />} 
            options={{ 
              tabBarLabel:() => {return null}, 
              tabBarIcon: ({focused}) => (
                <>
                  <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
                  <Text>Cat</Text>
                </>
              )  }} 
          />    
        </Tab.Navigator>
      </View>
      {/* title */}
      
      {/* cards result list */}
    
      </Animated.View>
    </View>
  )
}

function ResultScreen({data}) {

  return(
    <View style={{minHeight: '100%'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text>New Pets</Text>
        <Image style={{width: 30, height: 30}} source={require('../../assets/icons/filter1.png')} />
      </View>
      <View style={{}}>
        {/* card */}
        <FlatList
          data={data}
          renderItem={({ item }) => <CardHome />}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            data.push(1)
            data.push(1)
          }}
          //ItemSeparatorComponent={() => <View style={{height: 20}} />}
          columnWrapperStyle={{justifyContent: 'space-between', paddingTop: 10,}}
          style={{paddingHorizontal: 15, }}
          onScroll={Animated.event([
            //{ nativeEvent: { contentOffset: { y: scrollOffsetY }}}              
           ])
          }
        />
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  filterButton: {
    marginLeft: 10, 
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

