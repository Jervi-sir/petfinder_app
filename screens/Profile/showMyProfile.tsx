import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { PetCard } from "./petCard"
 
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { StatusBar } from "@components/StatusBar";
import { HeaderSearch } from "@components/HeaderSearch";
import { useNavigation } from "@react-navigation/native";
import { routes } from "@constants/routes";


export const ShowMyProfile = () => {
  const navigation = useNavigation();

  return (
    <>
      <HeaderSearch />
      <ScrollView>
      <View style={{margin: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17}}>
          <Text style={{marginHorizontal: 20, fontSize: 20, color: colors.menu}}>My Profile</Text>
        </View>
        <View>
          <View style={{backgroundColor: colors.white, borderRadius: 10, overflow: 'hidden'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
              <View>
                <Text>Name Name</Text>
                <Text>location</Text>
                <Text>email</Text>
                <Text>phone Number</Text>
              </View>
              <View>
                <View style={{backgroundColor: colors.emptyImg1, width: 80, height: 69, borderRadius: 10}}></View>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate(routes.EDITPROFILE)} style={{backgroundColor: colors.menu, padding: 7}}>
                <Text style={{color: colors.white, textAlign: 'center'}}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View> 
        </View>
        <View style={{marginTop: 20, }}>
          <Text style={{marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: colors.menu}}>My Pets</Text>
            <PetCard />
            <PetCard />
        </View>
      </View>
      </ScrollView>

    </>
  )
}