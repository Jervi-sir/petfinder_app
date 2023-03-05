import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { PetCard } from "./petCard"
import { Dimensions } from 'react-native';
import { colors } from "../../constants/colors";
import { icons } from "../../constants/icons";
import { StatusBar } from "../../components/StatusBar";
import { HeaderSearch } from "../../components/HeaderSearch";

const screenHeight = Dimensions.get('screen').height;

export const ShowProfile = () => {
  return(
    <View style={{maxHeight: screenHeight * 20 / 100, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 999}}>
    <StatusBar />
    <HeaderSearch />
    <View style={{margin: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17}}>
        <TouchableOpacity style={{}}>
          <Image source={icons.BACK} style={{ width: 50, height: 50 }}/>
        </TouchableOpacity>
        <Text style={{marginHorizontal: 20, fontSize: 20, color: colors.menu}}>My Profile</Text>
      </View>
      <View>
        <View style={{backgroundColor: colors.white, borderRadius: 10, overflow: 'hidden'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
            <View style={{justifyContent: 'center'}}>
              <Text>Name Name</Text>
              <Text>email</Text>
              <Text>phone Number</Text>
            </View>
            <View>
              <View style={{backgroundColor: colors.emptyImg1, width: 80, height: 69, borderRadius: 10}}></View>
            </View>
          </View>
        </View> 
      </View>
      <View style={{marginTop: 20, }}>
        <Text style={{marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: colors.menu}}>My Pets</Text>
        <ScrollView contentContainerStyle={{minHeight: '50%'}}>
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
        </ScrollView>
      </View>
    </View>

  </View>
  )
}