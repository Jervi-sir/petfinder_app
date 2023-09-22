/* Components */
import { CardPet } from '@components/CardPet';
import { LogoHeader } from '@components/LogoHeader';
import { FilterSearch } from './components/FilterSearch';
import { CardVerticalSkeleton } from '@components/Skeletons/CardVerticalSkeleton';
/* Screens */
/* packages */
import axios from 'axios';
import { Image } from 'expo-image';
import { useRef, useState, useEffect } from 'react';
import DashedLine from 'react-native-dashed-line';
import { View, TextInput, FlatList, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native'
/* constants */
import Api from '@utils/Api';
import { colors } from '@constants/colors';
import { routes } from '@constants/routes';
/* useContexts */
/* helpers */
import { getAuthToken } from '@functions/cookies';
import { useAuth } from '@context/AuthContext';
import Routes from '@utils/Routes';
import { RefreshControl } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

/*--------------*/

export const SearchScreen = () => {
  const [data, setData] = useState([]);
  const { BearerToken } = useAuth();
  const [keywords, setKeywords] = useState('');

  const flatListRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };
  /*--- Search inputed properties ---*/
  const [search, setSearch] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const handleOnSearch = (e) => {
    setCurrentPage(1);
    setIsLoading(true);
    setKeywords(e);
  }
  
  useEffect(() => {
    onSearch();
  }, [keywords]);
  
  const onSearch = async () => {
    if (loading || !hasMore) return;
    const url = Api.Server + (BearerToken ? Api.Auth : '') + Api.Search + '?page=' + currentPage;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BearerToken}`
    };
    let requestConfig = { headers };
    if (keywords !== '') {
      requestConfig.params = { keywords: keywords };
    }
    const response = await axios.get(url, requestConfig);
    moveInputToTop();
    const newPets = response.data.pets;
    const lastPage = response.data.last_page;
    if(currentPage === 1) {
      setData(newPets);
    } else {
      setData(prevData => [...prevData, ...newPets]);
    }
    setSearch(true);
    setIsLoading(false);
    setCurrentPage(prevPage => prevPage + 1);
    if (currentPage >= lastPage) {
      setHasMore(false);
    }
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

 
  return (
    <>
      <Animated.View style={[
          {
            transform: [{ translateY: translateY }],
          },
        ]}>
        <HeaderSearch onPress={handleOnSearch}/>
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
              {data.length === 0 && (
                <>
                <Text style={{textAlign: 'center', fontSize: 20, marginTop: 69}}>No Pets Found</Text>
                </>
              )}
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
                  renderItem={({ item }) => <CardPet pet={item} viewPetRoute={Routes.ShowPetScreen}/>}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReachedThreshold={0.01}
                  onEndReached={onSearch}
                  //ItemSeparatorComponent={() => <View style={{height: 20}} />}
                  columnWrapperStyle={{ justifyContent: 'space-between', paddingTop: 10, }}
                  style={{ paddingHorizontal: 15, }}
                  ListFooterComponent={() => <>
                    {hasMore && data.length != 0 ? <ActivityIndicator size={40} color={colors.menu} style={{ marginVertical: 31 }}/> : null}
                    <View style={{ height: 269, width: '100%'}}></View>
                  </>
                  }
                />
              )}

            </View>
          </View>
        </View>
      </Animated.View>
      :
      null
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

