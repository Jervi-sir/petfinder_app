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
import { useHelper } from "@context/HelperContext"
import LottieView from 'lottie-react-native';
import loading4 from '@assets/animations/loading4.json';
import { LoadingWithMessage } from './../../../components/Loadings/LoadingWithMessage';
import { LocationPermissionButton } from "@components/LocationPermissionButton"
import { useLocation } from "@context/LocationContext"
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

  const [wilaya, setWilaya] = useState(null);
  const [offerType, setOfferType] = useState(null);
  const [color, setColor] = useState(null);
  const [gender, setGender] = useState(null);

  const { BearerToken } = useAuth();
  const { userWilaya, isLocationLoading, ignoreLocationPermissions } = useLocation();

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    if (!isLocationLoading && userWilaya !== null) {
      setFirstLoading(true);
      fetchPosts(1);
    }
  }, [userWilaya, isLocationLoading, ignoreLocationPermissions]);

  const applyFilters = () => {
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchPosts(1, true);
    setHasMore(true);
  };

  const fetchPosts = async (page, overwrite = false, thisWilaya = userWilaya) => {
    //if (loading || !hasMore) return;
    if (loading) return;
    setLoading(true);
    
    if(wilaya) {
      thisWilaya = wilaya
    }

    const url = Api.Server + (BearerToken ? Api.Auth : '') + Api.getLatestPets + '?page=' + page + (thisWilaya ? ('&wilaya_id=' + thisWilaya) : '');
    console.log(url)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BearerToken}`
    };
    let requestConfig = { headers };

    requestConfig.params = {
      ...(raceId !== 0 && { race_id: raceId }),
      ...(thisWilaya && { wilaya_id: thisWilaya }),
      ...(offerType && { offer_type_id: offerType }),
      ...(color && { color: color }),
      ...(gender && { gender_id: gender }),
      
    };

    try {
      const response = await axios.get(url, requestConfig);
      const newPets = response.data.pets;
      const lastPage = response.data.paginationData.last_page;
      const nextPage = response.data.paginationData.next_page;

      if (overwrite) {
        setData(newPets);
      } else {
        setData(prevData => [...prevData, ...newPets]);
      }
      setFirstLoading(false);
      setLoading(false);
      setCurrentPage(prevPage => nextPage);
      if (currentPage >= lastPage) {
        setHasMore(false);
      }
      if (newPets.length <= 0) {
        setHasMore(false);
      }
    } catch (error) {
      // Handle the error
      setLoading(false);
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setData([]);
    setLoading(true);
    //setFirstLoading(true);
    setCurrentPage(1); // Reset to page 1 instead of keeping the old page
    fetchPosts(1, true); // Fetch the first page and overwrite existing data
    setRefreshing(false);
    setRefreshing(false);

  }

  return (
    <View style={{ minHeight: '100%', backgroundColor: colors.background }}>
      <FilterSearch
        onPressToTop={scrollToTop}
        title={'Recent ' + raceName}
        onFilter={applyFilters}
        setWilaya={setWilaya}
        setOfferType={setOfferType}
        setColor={setColor}
        setGender={setGender}
      />
      <View style={{}}>
        {
          userWilaya === null
          &&
          <View style={{ position: 'absolute', zIndex: 99, top: '7%', width: '100%'}}>
            <LoadingWithMessage message="Searching Nearest to your Wilaya" />
            <LocationPermissionButton />
          </View>
        }
        {/* card */}
        {firstLoading ? (
          <FlatList
            ref={flatListRef}
            data={[1, 2, 3, 5, 4]}
            renderItem={({ item }) => <CardVerticalSkeleton />}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingTop: 10}}
            style={{ paddingHorizontal: 15, }}
          />
        ) : (
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            //contentInset={{ top: 1 }}
            ref={flatListRef}
            data={data}
            renderItem={({ item, index }) => <CardPet pet={item} viewPetRoute={Routes.ShowPetScreen} index={index} />}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              if (!loading || !refreshing || hasMore) {
                fetchPosts(currentPage);
              }
            }}
            onEndReachedThreshold={0.01}
            //ItemSeparatorComponent={() => <View style={{height: 20}} />}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingTop: 10, }}
            style={{ paddingHorizontal: 15, }}
            ListFooterComponent={() => <>
              {loading ? <ActivityIndicator size="large" style={{ marginVertical: 31 }} /> : null}
              <View style={{ height: 400, width: '100%' }}></View>
            </>
            }
          />
        )}
      </View>
    </View>
  )
}