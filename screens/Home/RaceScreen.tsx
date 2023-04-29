import { CardPet } from "@components/CardPet"
import { CardVerticalSkeleton } from "@components/Skeletons/CardVerticalSkeleton"
import { api } from "@constants/api"
import { colors } from "@constants/colors"
import { icons } from "@constants/icons"
import { routes } from "@constants/routes"
import { getToken } from "@functions/authToken"
import { FilterDropdown } from "@screens/Search/FilterDropdown"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { LayoutAnimation, TouchableOpacity } from "react-native"
import { View, Text, Image, FlatList, Animated, ActivityIndicator } from "react-native"
import { FilterSearch } from "./FilterSearch"


export const RaceScreen = ({ raceId }) => {
  const [data, setData] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const flatListRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    axios.get(api.Server + (getToken ? api.getRaceAuth : api.getRace) + raceId + '?page=' + currentPage, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() } })
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

  return (
    <View style={{minHeight: '100%', backgroundColor: colors.background}}>
      <FilterSearch onPressToTop={scrollToTop} title={'Recent'} />
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