import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { HeaderSearch } from "../../components/HeaderSearch"
import { StatusBar } from "../../components/StatusBar"
import { COLORS } from "../../constants"
import { PetCard } from "./petCard"
 
export const ShowMyProfile = () => {
  return (
    <>
      <StatusBar />
      <HeaderSearch />
      <View style={{margin: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17}}>
          <TouchableOpacity style={{}}>
            <Image source={require('../../assets/icons/back.png')} style={{ width: 50, height: 50 }}/>
          </TouchableOpacity>
          <Text style={{marginHorizontal: 20, fontSize: 20, color: COLORS.menu}}>My Profile</Text>
        </View>
        <View>
          <View style={{backgroundColor: COLORS.white, borderRadius: 10, overflow: 'hidden'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
              <View>
                <Text>Name Name</Text>
                <Text>email</Text>
                <Text>phone Number</Text>
              </View>
              <View>
                <View style={{backgroundColor: COLORS.emptyImg1, width: 80, height: 69, borderRadius: 10}}></View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={{backgroundColor: COLORS.menu, padding: 7}}>
                <Text style={{color: COLORS.white, textAlign: 'center'}}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View> 
        </View>
        <View style={{marginTop: 20, }}>
          <Text style={{marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: COLORS.menu}}>My Pets</Text>
          <ScrollView contentContainerStyle={{minHeight: '50%'}}>
            <PetCard />
            <PetCard />
          </ScrollView>
        </View>
      </View>

    </>
  )
}