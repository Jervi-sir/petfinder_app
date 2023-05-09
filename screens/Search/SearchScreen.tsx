import { View, Image, TextInput, FlatList, ScrollView, Animated, StyleSheet } from 'react-native'
import DashedLine from 'react-native-dashed-line';
import { FilterSearch } from './FilterSearch';
import { Separator } from '@components/Separator';
import { colors } from '@constants/colors';
import { CardPet } from '@components/CardPet';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { api } from '@constants/api';
import { CardVerticalSkeleton } from '@components/Skeletons/CardVerticalSkeleton';
import { GlobalVariable } from '@constants/GlobalVariable';
import { getToken } from '@functions/authToken';
import { routes } from '@constants/routes';
import {TouchableOpacity} from 'react-native'
import { LogoHeader } from '@components/LogoHeader';

export const SearchScreen = () => {
  const [data, setData] = useState([]);
  const flatListRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };
  /*--- Search inputed properties ---*/
  const [search, setSearch] = useState(false);

  const onSearch = (keywords) => {
    console.log(keywords);
    fetchSearch(keywords);
    moveInputToTop();
    setSearch(true);
  }

  const translateY = useRef(new Animated.Value(250)).current;
  const moveInputToTop = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true, 
    }).start();
  };
  /*---------------------------------*/
  function fetchSearch(keywords) {
    if (getToken()) {
      axios.get(api.Server + api.getLatestPetsAuth, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() } })
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
  }

  return (
    <>
      <Animated.View style={[
          {
            transform: [{ translateY: translateY }],
          },
        ]}>
        <HeaderSearch onPress={onSearch}/>
      </Animated.View>
      {search 
      ?
      <Animated.View style={[
        {
          transform: [{ translateY: translateY }],
        },
      ]}>
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
                  renderItem={({ item }) => <CardPet pet={item} viewPetRoute={routes.VIEWPET}/>}
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
      </Animated.View>
      :
      <></>
      }
      
    </>
  )
}

export const HeaderSearch = ({ onPress }) => {
  const [keywords, setKeywords] = useState('');
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 7}}>
        <LogoHeader />
        <View style={{flexDirection: 'row', flex:1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 7}}>
          <TextInput
            style={{ height: 40, borderColor: 'gray',flex: 1 ,paddingLeft: 5 }}
            placeholder="Insert your text!"
            onChangeText={(text) => {
              setKeywords(text);
            }}
          />
          <TouchableOpacity onPress={() => onPress(keywords)}>
            <Image style={{width: 40, height: 40}} source={require('@assets/icons/search.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
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

