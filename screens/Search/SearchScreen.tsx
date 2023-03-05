import {View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, FlatList, ScrollView, Animated, StyleSheet} from 'react-native'
import { StatusBar } from '@components/StatusBar';
import { CardPet } from '@components/CardPet'
import icons from 'constants/icons';
import colors from 'constants/colors';
import DashedLine from 'react-native-dashed-line';
import { FilterSearch } from './FilterSearch';


export const SearchScreen = () => {
  const data = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View style={{backgroundColor: colors.background}}>
      <StatusBar />
      <View style={styles.inputStyle2}>
        <Image style={{width: 69, height: 69}} source={icons.LOGO} />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{flexDirection: 'row', flex:1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 7}}>
            <TextInput
              style={{ height: 40, borderColor: 'gray',flex: 1 ,paddingLeft: 5 }}
              placeholder="Insert your text!"
              onChangeText={text => {
              }}
            />
            <Image style={{width: 40, height: 40}} source={icons.SEARCH} />
          </View>
        </ScrollView>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />

      <View style={{minHeight: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10}}>
          <Text style={{fontSize: 25, fontWeight: '600', color: colors.menu}}>Results</Text>
          <Image style={{width: 30, height: 30}} source={icons.FILTER1} />
        </View>
        <FilterSearch />
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
    </View>
  )
}

const styles = StyleSheet.create({
  filterButton: {
    marginLeft: 10, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    width: 69-10, 
    height: 69-10, 
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

