import { CardPet } from "@components/CardPet"
import { CardVerticalSkeleton } from "@components/Skeletons/CardVerticalSkeleton"
import { api } from "@constants/api"
import { colors } from "@constants/colors"
import { routes } from "@constants/routes"
import { getToken } from "@functions/authToken"
import axios from "axios"
import { useCallback, useEffect, useRef, useState, useContext } from "react"
import { RefreshControl } from "react-native"
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native"
import { FilterSearch } from "./FilterSearch"
import { useFocusEffect } from "@react-navigation/native"
import { AuthContext } from '@functions/AuthState';

export const RaceScreen = ({ raceId = 1, raceName = "Cat" }) => {
  const [data, setData] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const flatListRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { BearerToken } = useContext(AuthContext);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    setFirstLoading(true);
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      //setTabName(raceName);
      return () => {
      };
    }, [])
  );

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    axios.get(api.Server + (
      BearerToken 
      ? 
        (raceId == 0 ? api.getLatestPetsAuth : api.getLatestPetsByRaceAuth ) 
      : 
        (raceId == 0 ? api.getLatestPets : api.getLatestPetsByRace)
    ) 
    + (raceId == 0 ? '' : raceId) 
    + '?page=' + currentPage, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + BearerToken } })

    .then(response => {
      setData([...data, ...response.data.pets]);
      setFirstLoading(false);
      setLoading(false);
      setCurrentPage(currentPage + 1);
      if (currentPage >= response.data.last_page) {
        setHasMore(false);
      }
    })
  };

  const onRefresh = () => {
    console.log('refreshing')
    setRefreshing(true);
    setData([]);
    setLoading(true);
    setFirstLoading(true);
    axios.get(api.Server + (
      BearerToken 
      ? 
        ( raceId == 0 ? api.getLatestPetsAuth : api.getLatestPetsByRaceAuth ) 
      : 
        (raceId == 0 ? api.getLatestPets : api.getLatestPetsByRace)
    ) 
    + (raceId == 0 ? '' : raceId) 
    + '?page=' + 1, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + BearerToken } })

    .then(response => {
      setData(response.data.pets);
      setLoading(false);
      setCurrentPage(2);
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }).then(() => setFirstLoading(false))
    setRefreshing(false);
  };

  return (
    <View style={{minHeight: '100%', backgroundColor: colors.background}}>
          <TouchableOpacity style={{backgroundColor: colors.lightGrey, height: 40}}
      onPress={() =>{
        console.log(BearerToken)
      }}>
      <Text>test</Text>
    </TouchableOpacity>
      <FilterSearch onPressToTop={scrollToTop} title={'Recent ' + raceName} />
      <View style={{}}>
        {/* card */}
        {firstLoading ? (
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
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              ref={flatListRef}
              data={data}
              renderItem={({ item }) => <CardPet pet={item} viewPetRoute={routes.VIEWPET}/>}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => {if(!refreshing) fetchPosts() }}
              onEndReachedThreshold={0.01}
              //ItemSeparatorComponent={() => <View style={{height: 20}} />}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingTop: 10, }}
              style={{ paddingHorizontal: 15, }}
              ListFooterComponent={() => <>
                {loading ? <ActivityIndicator size="large" style={{ marginVertical: 31 }}/> : null}
                <View style={{ height: 400, width: '100%'}}></View>
              </>
              
              }

            />
          )}
      </View>
    </View>
  )
}