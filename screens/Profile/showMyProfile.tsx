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
import { CardHorizentalSkeleton } from "@components/Skeletons/CardHorizentalSkeleton";
import { ProfileCardSkeleton } from "@components/Skeletons/ProfileCardSkeleton";

export const ShowMyProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [pets, setPets] = useState([]);
  const [nbPets, setNbPets] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(api.Server + api.ShowMyProfileData, { headers: { Authorization: 'Bearer ' + GlobalVariable.authToken } })
      .then(response => {
        setIsLoading(false);
        console.log(response.data.user)
        const data = response.data;
        console.log(data.pets)
        setUser(data.user)  //email, location, name, phone_number, pic, social_list, wolaya_name
        setPets(data.pets)  //id, birthday, description, gender_id, gender_name, images_preview, is_active, location, name, offer_type_id, offer_type_name, price, race_name, sub_race, wilaya_name, wilaya_number,
        setNbPets(data.pets.length)
      }).catch(error => {
        setIsLoading(true);
        console.log(error);
      });
  }, []);

  return (
    <>
      <View style={{ margin: 20, marginTop: 0, }}>
        <View style={{ minHeight: 600, }}>
          {isLoading ? (
            <FlatList
              data={[1, 2, 3]}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => {
                return (
                  <>
                    <ProfileCardSkeleton />
                  </>
                )
              }}
              renderItem={() => <CardHorizentalSkeleton />}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <FlatList
              data={pets}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => {
                return (
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 7 }}>
                      <Text style={{ marginHorizontal: 20, fontSize: 20, color: colors.menu, fontWeight: '600' }}>My Profile</Text>
                    </View>
                    <ProfileCard user={user} navigation={navigation} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: colors.menu, fontWeight: '600' }}>My Pets</Text>
                      <Text style={{ marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: colors.menu }}>
                        {nbPets} pet{nbPets > 0 ? 's' : ''}
                      </Text>
                    </View>
                  </>
                )
              }}
              ListFooterComponent={() => <View style={{ width: '100%', height: 123 }}></View>}
              renderItem={({ item, index }) => <PetCard pet={item} />}
              keyExtractor={(item, index) => index.toString()}
              onScroll={(event) => {
                //setScrollOffset(event.nativeEvent.contentOffset.y);
              }}
            />
          )}
        </View>
      </View>
    </>
  )
}

const ProfileText = ({ data, placeholder }) => {
  return (
    <Text style={{ textDecorationLine: data == null ? 'line-through' : 'none', opacity: data == null ? 0.5 : 1 }} >{data == null ? placeholder : data}</Text>
  )
}

const ProfileCard = ({ user, navigation }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View>
        <View style={{ backgroundColor: colors.white, borderRadius: 10, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <View>
              <ProfileText data={user.name} placeholder={'name'} />
              <Text>{user.email}</Text>
              <ProfileText data={user.location} placeholder={'location'} />
              <ProfileText data={user.phone_number} placeholder={'phone number'} />
            </View>
            <View>
              {user.pic ? (
                <Image source={{ uri: user.pic }} style={{ width: 80, height: 80, borderRadius: 10 }} />
              ) : (
                <View style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: colors.emptyImg1 }}></View>
              )}
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(routes.EDITPROFILE)} style={{ backgroundColor: colors.menu, padding: 7 }}>
              <Text style={{ color: colors.white, textAlign: 'center' }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}