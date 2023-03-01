import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { HeaderSearch } from "../../components/HeaderSearch"
import { StatusBar } from "../../components/StatusBar"
import { COLORS } from "../../constants"
 
export const MessageScreen = () => {
  return (
    <>
      <StatusBar />
      <View style={{margin: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17}}>
          <TouchableOpacity style={{}}>
            <Image source={require('../../assets/icons/back.png')} style={{ width: 50, height: 50 }}/>
          </TouchableOpacity>
          <Text style={{marginHorizontal: 20, fontSize: 20, color: COLORS.menu}}>Message</Text>
        </View>
        <View style={{height: 123,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 13, padding:20}}>
          <View style={{}}>
            <View style={{backgroundColor: COLORS.emptyImg1, width: 69, height: 69, borderRadius: 10}}></View>
          </View>
          <View style={{flex: 1, paddingLeft: 10,}}>
            <Text style={{fontSize: 20, fontWeight: '500',  color: COLORS.menu,}}>Name</Text>
            <Text style={{fontSize: 14, fontWeight: '300',  color: COLORS.lightGrey,}}>Race</Text>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <Image source={require('../../assets/icons/location.png')} style={{width:20, height: 20}}/>
              <Text style={{fontSize: 15, fontWeight: '400',  color: COLORS.lightGrey,}}>Location</Text>
            </View>
            <Text style={{fontSize: 15, fontWeight: '400',  color: COLORS.lightGrey,}}>Description</Text>
          </View>
          <View>
            <View style={{backgroundColor: COLORS.femaleBackground, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginBottom: 11 }}>
              <Text style={{color: COLORS.femaleText, textAlign: 'center', fontSize: 13}}>Female</Text>
            </View>
            <View style={{backgroundColor: COLORS.lightWhite, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginBottom: 11 }}>
              <Text style={{color: COLORS.menu, textAlign: 'center', fontSize: 13}}>20 years</Text>
            </View>
            <View style={{backgroundColor: COLORS.lightWhite, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 }}>
              <Text style={{color: COLORS.menu, textAlign: 'center', fontSize: 13}}>Price</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{textAlign: 'center', color: COLORS.menu, fontSize: 30, marginTop: 20}}>Coming soon</Text>
        </View>
      </View>
    </>
  )
}