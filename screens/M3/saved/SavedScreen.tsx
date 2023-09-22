/* Components */
import { CardPet } from "@components/CardPet"
import { CardVerticalSkeleton } from "@components/Skeletons/CardVerticalSkeleton"
import { FilterSearch } from "../components/FilterSearch"
/* Screens */
/* packages */
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { View, FlatList, Animated } from "react-native"
/* constants */
import { colors } from "@constants/colors"
import { routes } from "@constants/routes"
/* useContexts */
import { getToken } from "@functions/authToken"
import Api from "@utils/Api"
/*--------------*/

export const SavedScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    if (getToken) {
      axios.get(Api.Server + Api.getLatestPetsAuth, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() } })
        .then(response => {
          setIsLoading(false);
          setData(response.data.pets);
          console.log(response.data)
        })
    } else {
      axios.get(Api.Server + Api.getLatestPets)
        .then(response => {
          setIsLoading(false);
          setData(response.data.pets);
          //console.log(response.data)
        })
    }

  }, []);
  return (
    <View style={{minHeight: '100%', backgroundColor: colors.background}}>
      <FilterSearch onPressToTop={scrollToTop} title={'Liked Pets'} />
      <View style={{}}>
        {/* card */}
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
              onScroll={
                Animated.event([
                //{ nativeEvent: { contentOffset: { y: scrollOffsetY }}}              
                ])
              }
            />
          )}
      </View>
    </View>
  )
}