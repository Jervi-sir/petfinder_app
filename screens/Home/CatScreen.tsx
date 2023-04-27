import { CardPet } from "@components/CardPet"
import { CardVerticalSkeleton } from "@components/Skeletons/CardVerticalSkeleton"
import { api } from "@constants/api"
import { colors } from "@constants/colors"
import { icons } from "@constants/icons"
import { routes } from "@constants/routes"
import { getToken } from "@functions/authToken"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { View, Text, Image, FlatList, Animated } from "react-native"
import { FilterSearch } from "./FilterSearch"

export const CatScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    if (getToken) {
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

  }, []);
  return (
    <View style={{minHeight: '100%', backgroundColor: colors.background}}>
      <FilterSearch onPressToTop={scrollToTop} title={'Recent Cats'} />

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
              onScroll={Animated.event([
                //{ nativeEvent: { contentOffset: { y: scrollOffsetY }}}              
              ])
              }
            />
          )}
      </View>
    </View>
  )
}