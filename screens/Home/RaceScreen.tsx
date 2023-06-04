import { CardPet } from "@components/CardPet"
import { CardVerticalSkeleton } from "@components/Skeletons/CardVerticalSkeleton"
import { api } from "@constants/api"
import { colors } from "@constants/colors"
import { routes } from "@constants/routes"
import { getToken } from "@functions/authToken"
import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import { RefreshControl } from "react-native"
import { View, FlatList, ActivityIndicator } from "react-native"
import { FilterSearch } from "./FilterSearch"
import { useFocusEffect } from "@react-navigation/native"


export const RaceScreen = ({ raceId = 1, raceName = "Cat" }) => {

  useEffect(() => {
    setFirstLoading(true);
    fetchPosts();
  }, []);

  const [data, setData] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const flatListRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

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
    
    axios.get(api.Server + (getToken() ? api.getRaceAuth : api.getRace) + raceId + '?page=' + currentPage, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() } })
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
    setRefreshing(true);
    setData([]);
    setLoading(true);
    setFirstLoading(true);
    axios.get(api.Server + (getToken() ? api.getRaceAuth : api.getRace) + raceId + '?page=' + currentPage, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() } })
    .then(response => {
      setData([...data, ...response.data.pets]);
      setLoading(false);
      setCurrentPage(currentPage + 1);
      if (currentPage >= response.data.last_page) {
        setHasMore(false);
      }
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      setRefreshing(false);
      
    }).then(() => setFirstLoading(false))
    
  };

  return (
    <View style={{minHeight: '100%', backgroundColor: colors.background}}>
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
              onEndReached={fetchPosts}
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