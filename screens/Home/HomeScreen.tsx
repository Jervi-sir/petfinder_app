import {View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, FlatList, ScrollView, Animated} from 'react-native'
import { CardHome } from './CardHome'
import { MasonryFlashList } from "@shopify/flash-list";
import { useState,useRef } from 'react';

export const HomeScreen = () => {
  const data = [1, 2, 3, 4, 5, 6, 7];
  let inputStyle1 = {flexDirection: 'column', paddingRight: 10, paddingLeft: 10};
  let titleStyle1 = {fontSize: 20, fontWeight: 'bold'};

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animateInput = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  let inputStyle2 = {flexDirection: 'row', alignItems: 'center', paddingRight: 10, paddingLeft: 10};

  const [userDidInput, setUserDidInput] = useState(false);
  return (
    <SafeAreaView>
      {/* Top */}
      <Animated.View style={!userDidInput ? inputStyle1 : inputStyle2}>
        <Image style={{width: 69, height: 69}} source={require('../../assets/icons/logo.png')} />
        {!userDidInput ? (<Text style={titleStyle1}>Find your Favorite Pet</Text>) : ''}
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{flexDirection: 'row', flex:1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 7}}>
            <TextInput
              style={{ 
                height: 40, 
                borderColor: 'gray',
                flex: 1 ,
                paddingLeft: 5
              }}
              placeholder="Insert your text!"
              onChangeText={text => {
                setUserDidInput(true);
              }}

            />
            <Image style={{width: 40, height: 40}} source={require('../../assets/icons/search.png')} />
          </View>
        </ScrollView>
      </Animated.View>
      {/* Dotted Line */}
      <View style={{
          borderStyle: 'dashed',
          borderWidth: 1,
        }}>
      </View>
      {/* pet filter */}
      <View style={{flexDirection: 'row', backgroundColor: 'transparent', paddingVertical: 10}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{marginLeft: 10, backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
              <Text>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10, backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
              <Text>Cat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10, backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
              <Text>Dog</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10, backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
              <Text>Horse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10, backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
              <Text>Hamster</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10, backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
              <Text>Bird</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10, backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
              <Text>Goat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10, backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
              <Text>Snakes</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
      {/* title */}
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text>New Pets</Text>
        <Image style={{width: 30, height: 30}} source={require('../../assets/icons/filter1.png')} />
      </View>
      {/* cards result list */}
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
          style={{backgroundColor: 'red', paddingHorizontal: 15}}

        />
      </View>
    </SafeAreaView>
  )
}

