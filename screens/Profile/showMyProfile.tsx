import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { PetCard } from "./petCard"
 
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { StatusBar } from "@components/StatusBar";
import { HeaderSearch } from "@components/HeaderSearch";
import { useNavigation } from "@react-navigation/native";
import { routes } from "@constants/routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from '@constants/api';
import { GlobalVariable } from "@constants/GlobalVariable";
import { FlatList } from "react-native-gesture-handler";

export const ShowMyProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get(api.SERVER + api.GETMYPROFILE, {headers:{Authorization: 'Bearer ' + GlobalVariable.authToken}})
      .then(response => {
        const data = response.data;
        setUser(data.user)
        setPets(data.pets)

      }).catch(error => {
        console.log(error);
        // handle error
      });
  }, []);

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
                <Text>{ user.name ? user.name : 'no name' }</Text>
                <Text>{ user.location ? user.location : 'no location' }</Text>
                <Text>{ user.email }</Text>
                <Text>{ user.phone_number ? user.phone_number : 'no phone number' }</Text>
              </View>
              <View>
                <Image source={{ uri: user.pic }} style={{width: 80, height: 80, borderRadius: 10}}/>
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
            <FlatList
            data={pets}
            renderItem={({ item }) => <PetCard pet={item}/>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      </ScrollView>

    </>
  )
}