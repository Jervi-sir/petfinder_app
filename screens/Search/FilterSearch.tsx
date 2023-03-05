import {View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, LayoutAnimation, FlatList, ScrollView, Animated, StyleSheet} from 'react-native'
import { useState } from 'react';
import { FloatingDropdown } from '../../components/FloatingDropdown';
import { colors } from '../../constants/colors';
import { FilterDropdown } from './FilterDropdown';
import { icons } from '../../constants/icons';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export const FilterSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapsibleView = () => {
    setIsExpanded(!isExpanded);
    const animationConfig = {
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    };
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: animationConfig.duration,
      useNativeDriver: false,
    }).start(() => {
      // Run LayoutAnimation after animation completes
      LayoutAnimation.configureNext(animationConfig.update);
    });
  };
  const SearchFilter = () => {
    toggleCollapsibleView()
  }

  return (
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10}}>
      <Text style={{fontSize: 25, fontWeight: '600', color: colors.menu}}>Results</Text>
      <TouchableOpacity onPress={toggleCollapsibleView}>
        <Animated.Image 
          source={isExpanded ? icons.CROSS : icons.FILTER1}
          style={{width: 30, height: 30}} 
        />
      </TouchableOpacity>
    </View>
    <Animated.View 
    style={{
    overflow: 'hidden',
      height: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 350],
      }),
    }}>
      <View style={{position: 'relative', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, marginHorizontal: 15}}>
        <View style={{marginTop: 10}}>
          <Text style={{textAlign: 'center', fontSize: 21, fontWeight: '400', color: colors.menu }}>Filter</Text>
        </View>
        <View style={{paddingHorizontal: 17}}>
          <FilterDropdown placeholder={'Race'} data={data} />
          <FilterDropdown placeholder={'Wilaya'} data={data} />
          <FilterDropdown placeholder={'Offer Type'} data={data} />
          <FilterDropdown placeholder={'Color'} data={data} />
        </View>
        <TouchableOpacity onPress={SearchFilter} style={{backgroundColor: colors.menu, paddingVertical: 10}}>
          <Text style={{textAlign: 'center', fontSize: 17, color: colors.white}}>Filter Results</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
    </>
  )
}