import { View, Text, TouchableOpacity, LayoutAnimation, Animated, StyleSheet } from 'react-native'
import { useState } from 'react';
import { colors } from '@constants/colors';
import { FilterDropdown } from './FilterDropdown';
import { icons } from '@constants/icons';

const wilayaList = [
  { label: '1- Adrar', value: '1' },
  { label: '13- Tlemcen', value: '13' },
  { label: '15- Tizi Ouzou', value: '15' },
  { label: '16- Alger', value: '16' },
  { label: '17- Djelfa', value: '17' },
  { label: '31- Oran', value: '31' },
  { label: '46- Ain Temouchent', value: '46' },
  { label: '47- Ghardaia', value: '47' },
];

const offerList = [
  { label: 'Adoption', value: '1' },
  { label: 'Sales', value: '2' },
  { label: 'Rent', value: '3' },
  { label: 'Coupling', value: '4' },
]

const colorList = [
  { label: 'Black', value: '1' },
  { label: 'White', value: '2' },
  { label: 'Brown', value: '3' },
  { label: 'Grey', value: '4' },
  { label: 'Orange', value: '5' }
]

export const FilterSearch = ({ onPressToTop, title }) => {
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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={onPressToTop}>
          <Text style={{ fontSize: 25, fontWeight: '600', color: colors.menu }}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCollapsibleView}>
          <Animated.Image
            source={isExpanded ? icons.CROSS : icons.FILTER1}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          overflow: 'hidden',
          height: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300],
          }),
        }}>
        <View style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, marginHorizontal: 15 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 21, fontWeight: '400', color: colors.menu }}>Filter</Text>
          </View>
          <View style={{ paddingHorizontal: 17 }}>
            <FilterDropdown placeholder={'Wilaya'} data={wilayaList} />
            <FilterDropdown placeholder={'Offer Type'} data={offerList} />
            <FilterDropdown placeholder={'Color'} data={colorList} />
          </View>
          <TouchableOpacity onPress={SearchFilter} style={{ backgroundColor: colors.menu, paddingVertical: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 17, color: colors.white }}>Filter Results</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  )
}