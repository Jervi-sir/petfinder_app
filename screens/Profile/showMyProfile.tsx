import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native"
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
import { FlashList } from "@shopify/flash-list";

export const ShowMyProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [pets, setPets] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    axios.get(api.Server + api.ShowMyProfileData, {headers:{Authorization: 'Bearer ' + GlobalVariable.authToken}})
      .then(response => {
        console.log(response.data.user)
        const data = response.data;
        console.log(data.pets)
        setUser(data.user)  //email, location, name, phone_number, pic, social_list, wolaya_name
        setPets(data.pets)  //id, birthday, description, gender_id, gender_name, images_preview, is_active, location, name, offer_type_id, offer_type_name, price, race_name, sub_race, wilaya_name, wilaya_number,
      }).catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <View style={{margin: 20}}>
        
        <View style={{marginTop: 20, minHeight: 600,  }}>
          {pets.length > 0 ? (
            <FlatList
            data={pets}
            ListHeaderComponent={() => {
              return (
                <>
                  <ProfileCard user={user} navigation={navigation} />
                  <Text style={{marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: colors.menu}}>My Pets</Text>
                </>
              )
            }}
            ListFooterComponent={() => <View style={{width: '100%', height: 123}}></View> }
            renderItem={({ item, index }) => <PetCard pet={item}/>}
            keyExtractor={(item, index) => index.toString()}
            onScroll={(event) => {
              //setScrollOffset(event.nativeEvent.contentOffset.y);
            }}
          />
          ) : (
            <Text>No Pets Added</Text>
          )}
        </View>
      </View>
    </>
  )
}

const ProfileText = ({data, placeholder}) => {
  return (
    <Text style={{textDecorationLine: data == null ? 'line-through' : 'none', opacity: data == null ? 0.5 : 1 }} >{ data == null ? placeholder : data }</Text>
  )
}

const ProfileCard = ({user, navigation}) => {
  return (
    <View style={{marginBottom: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17}}>
        <Text style={{marginHorizontal: 20, fontSize: 20, color: colors.menu}}>My Profile</Text>
      </View>
      <View>
        <View style={{backgroundColor: colors.white, borderRadius: 10, overflow: 'hidden'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
            <View>
              <ProfileText data={user.name} placeholder={'name'} />
              <Text>{ user.email }</Text>
              <ProfileText data={user.location} placeholder={'location'} />
              <ProfileText data={user.phone_number} placeholder={'phone number'} />
            </View>
            <View>
              {user.pic ? (
                <Image source={{ uri: user.pic }} style={{width: 80, height: 80, borderRadius: 10}}/>
              ) : (
                <View style={{width: 80, height: 80, borderRadius: 10, backgroundColor: colors.emptyImg1}}></View>
              )}
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(routes.EDITPROFILE)} style={{backgroundColor: colors.menu, padding: 7}}>
              <Text style={{color: colors.white, textAlign: 'center'}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View> 
      </View>
    </View>
  )
}