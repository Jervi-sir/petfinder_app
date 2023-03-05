import { View, Text, TouchableOpacity } from "react-native"
import { FloatingDropdown } from '@components/FloatingDropdown';
import colors from "constants/colors";

export const FilterSearch = () => {
  return (
    <>
    <View style={{borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, marginHorizontal: 15}}>
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 10}}>
        <Text style={{fontSize: 21, fontWeight: '400', color: colors.menu }}>x</Text>
      </TouchableOpacity>
      <View style={{marginVertical: 10}}>
        <Text style={{textAlign: 'center', fontSize: 21, fontWeight: '400', color: colors.menu }}>Filter</Text>
      </View>
      <View style={{paddingHorizontal: 17}}>
        <FloatingDropdown />
        <FloatingDropdown />
        <FloatingDropdown />
        <FloatingDropdown />
      </View>
      <TouchableOpacity style={{backgroundColor: colors.menu, paddingVertical: 10}}>
        <Text style={{textAlign: 'center', fontSize: 17, color: colors.white}}>Filter Results</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}