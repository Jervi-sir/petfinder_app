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


export const SearchScreen = () => {
  const [data, setData] = useState([]);
  const flatListRef = useRef(null);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    axios.get(api.Server + api.getLatestPets)
      .then(response => {
        setData(response.data.pets);
      })
  }, []);
  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={{ minHeight: '100%' }}>
        <FilterSearch onPressToTop={scrollToTop} />
        <View >
          {/* card */}
          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={({ item }) => <CardPet pet={item} />}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.01}
            ListFooterComponent={() => <View style={{ height: 400, width: '100%' }}></View>}
            onEndReached={info => {
              //data.push(1)
              //data.push(1)
            }}
            //ItemSeparatorComponent={() => <View style={{height: 20}} />}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingTop: 10, }}
            style={{ paddingHorizontal: 15, }}
            onScroll={Animated.event([
              //{ nativeEvent: { contentOffset: { y: scrollOffsetY }}}              
            ])
            }
          />
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

