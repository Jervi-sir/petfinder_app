import { CardPet } from "@components/CardPet"
import { colors } from "@constants/colors"
import { icons } from "@constants/icons"
import { View, Text, Image, FlatList, Animated } from "react-native"

export const CatScreen = ({data}) => {
  return (
    <View style={{minHeight: '100%', backgroundColor: colors.background}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text>New Cats</Text>
        <Image style={{width: 30, height: 30}} source={icons.FILTER1} />
      </View>
      <View style={{}}>
        {/* card */}
        <FlatList
          data={data}
          renderItem={({ item }) => <CardPet />}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            data.push(1)
            data.push(1)
          }}
          //ItemSeparatorComponent={() => <View style={{height: 20}} />}
          columnWrapperStyle={{justifyContent: 'space-between', paddingTop: 10,}}
          style={{paddingHorizontal: 15, }}
          onScroll={Animated.event([
            //{ nativeEvent: { contentOffset: { y: scrollOffsetY }}}              
           ])
          }
        />
      </View>
    </View>
  )
}