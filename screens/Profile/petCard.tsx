import {View, Text, Image, TouchableOpacity} from 'react-native'
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";

export const PetCard = () => {
  return (
    <TouchableOpacity 
      onPress={() => {}} 
      style={{marginBottom: 10}}
      activeOpacity={0.8}
      tvParallaxProperties={{
        enabled: true,
        tiltAngle: 0.2,
        pressDelay: 0.5
      }}
    >
      <View style={{backgroundColor: colors.white, padding: 5, borderRadius: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{ width: 99, height: 99, overflow:'hidden', justifyContent: 'flex-end', borderRadius: 10 }}>
            <Image source={icons.CATIMG} style={{ width: 99, height: 99 }}/>
          </View>
          <View style={{flex: 1, paddingLeft: 20, justifyContent: 'space-around'}}>
            <Text style={{fontSize: 20, fontWeight: '500', color: colors.menu}}>Name</Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: colors.lightGrey}}>Race</Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: colors.lightGrey}}>Description...</Text>
            <Text style={{fontSize: 13, fontWeight: '500', color: colors.menu}}>Adoption</Text>
          </View>
          <View >
            <View style={{backgroundColor: colors.femaleBackground, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginBottom: 11 }}>
              <Text style={{color: colors.femaleText, textAlign: 'center', fontSize: 13}}>Female</Text>
            </View>
            <View style={{backgroundColor: colors.lightWhite, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 }}>
              <Text style={{color: colors.menu, textAlign: 'center', fontSize: 13}}>20 years</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}