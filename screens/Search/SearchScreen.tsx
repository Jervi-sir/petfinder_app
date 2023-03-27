import { View, Image, TextInput, FlatList, ScrollView, Animated, StyleSheet } from 'react-native'
import DashedLine from 'react-native-dashed-line';
import { FilterSearch } from './FilterSearch';
import { Separator } from '@components/Separator';
import { colors } from '@constants/colors';
import { icons } from '@constants/icons';
import { CardPet } from '@components/CardPet';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { api } from '@constants/api';
import SkeletonLoading from '@components/Skeletons/SkeletonLoading';
import { TestSkeleton } from '@components/Skeletons/TestSkeleton';
import { CardVerticalSkeleton } from '@components/Skeletons/CardVerticalSkeleton';
import { GlobalVariable } from '@constants/GlobalVariable';

export const SearchScreen = () => {
  const [data, setData] = useState([]);
  const flatListRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    if (GlobalVariable.authToken) {
      axios.get(api.Server + api.getLatestPetsAuth, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GlobalVariable.authToken } })
        .then(response => {
          setIsLoading(false);
          setData(response.data.pets);
          console.log(response.data)
        })
    } else {
      axios.get(api.Server + api.getLatestPets)
        .then(response => {
          setIsLoading(false);
          setData(response.data.pets);
          //console.log(response.data)
        })
    }

  }, []);
  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={{ minHeight: '100%' }}>
        <FilterSearch onPressToTop={scrollToTop} />
        <View >
          {/*loading */}
          {isLoading ? (
            <FlatList
              ref={flatListRef}
              data={[1, 2, 3, 5, 4]}
              renderItem={({ item }) => <CardVerticalSkeleton />}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingTop: 10, }}
              style={{ paddingHorizontal: 15, }}
            />
          ) : (
            <FlatList
              ref={flatListRef}
              data={data}
              renderItem={({ item }) => <CardPet pet={item} />}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.01}
              ListFooterComponent={() => <View style={{ height: 400, width: '100%' }}></View>}
              onEndReached={info => {
                //data.push(1) //data.push(1)
              }}
              //ItemSeparatorComponent={() => <View style={{height: 20}} />}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingTop: 10, }}
              style={{ paddingHorizontal: 15, }}
              onScroll={Animated.event([
                //{ nativeEvent: { contentOffset: { y: scrollOffsetY }}}              
              ])
              }
            />
          )}

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  filterButton: {
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 69 - 10,
    height: 69 - 10,
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

