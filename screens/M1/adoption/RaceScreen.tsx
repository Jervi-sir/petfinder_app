/* Components */
import { CardVerticalSkeleton } from "@components/Skeletons/CardVerticalSkeleton"
import { CardPet } from "@components/CardPet"
import { FilterSearch } from "../components/FilterSearch"
/* Screens */
/* packages */
import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useRef, useState, useContext } from "react"
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, RefreshControl } from "react-native"
/* constants */
import { colors } from "@constants/colors"
import { routes } from "@constants/routes"
/* useContexts */
import { AuthContext } from '@functions/AuthState';
import Api from "@utils/Api"
import { useAuth } from "@context/AuthContext"
import Routes from "@utils/Routes"
/*--------------*/

export const RaceScreen = ({ route }) => {
  const { raceId, raceName } = route.params;
  const [data, setData] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const flatListRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { BearerToken } = useAuth();

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    setFirstLoading(true);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const url = Api.Server + (BearerToken ? Api.Auth : '') + Api.getLatestPets + '?page=' + currentPage;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BearerToken}`
    };
    let requestConfig = { headers };
    if (raceId !== 0) {
      requestConfig.params = { race_id: raceId };
    }

    try {
      const response = await axios.get(url, requestConfig);
      const newPets = response.data.pets;
      const lastPage = response.data.last_page;
      setData(prevData => [...prevData, ...newPets]);
      setFirstLoading(false);
      setLoading(false);
      setCurrentPage(prevPage => prevPage + 1);
      if (currentPage >= lastPage) {
        setHasMore(false);
      }
    } catch (error) {
      // Handle the error
      setLoading(false);
      console.error("Error fetching posts:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setData([]);
    setLoading(true);
    setFirstLoading(true);
    const url = Api.Server + (BearerToken ? Api.Auth : '') + Api.getLatestPets + '?page=' + currentPage;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BearerToken}`
    };
    let requestConfig = { headers };
    if (raceId !== 0) {
      requestConfig.params = { race_id: raceId };
    }
    axios.get(url, requestConfig )
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
              renderItem={({ item }) => <CardPet pet={item} viewPetRoute={Routes.ShowPetScreen}/>}
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