import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
 
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";

export const MessageScreen = ({navigation}) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{width: 69 - 20, height: 69 - 20 }} source={icons.BACK} />
          </TouchableOpacity>
          <Text style={{marginHorizontal: 20, fontSize: 20, color: colors.menu}}>Owner Name</Text>
        </View>
        <View style={{height: 123,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.white, borderRadius: 13, padding:20}}>
          <View style={{}}>
            <View style={{backgroundColor: colors.emptyImg1, width: 69, height: 69, borderRadius: 10}}></View>
          </View>
          <View style={{flex: 1, paddingLeft: 10,}}>
            <Text style={{fontSize: 20, fontWeight: '500',  color: colors.menu,}}>Name</Text>
            <Text style={{fontSize: 14, fontWeight: '300',  color: colors.lightGrey,}}>Race</Text>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <Image source={icons.LOCATION} style={{width:20, height: 20}}/>
              <Text style={{fontSize: 15, fontWeight: '400',  color: colors.lightGrey,}}>Location</Text>
            </View>
            <Text style={{fontSize: 15, fontWeight: '400',  color: colors.lightGrey,}}>Description</Text>
          </View>
          <View>
            <View style={{backgroundColor: colors.femaleBackground, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginBottom: 11 }}>
              <Text style={{color: colors.femaleText, textAlign: 'center', fontSize: 13}}>Female</Text>
            </View>
            <View style={{backgroundColor: colors.lightWhite, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginBottom: 11 }}>
              <Text style={{color: colors.menu, textAlign: 'center', fontSize: 13}}>20 years</Text>
            </View>
            <View style={{backgroundColor: colors.lightWhite, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 }}>
              <Text style={{color: colors.menu, textAlign: 'center', fontSize: 13}}>Price</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{textAlign: 'center', color: colors.menu, fontSize: 30, marginTop: 20}}>Coming soon</Text>
        </View>
      </View>
    </>
  )
}