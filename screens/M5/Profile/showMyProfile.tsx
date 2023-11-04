/* Components */
import { PetCard } from "./petCard"
import { ProfileCardSkeleton } from "@components/Skeletons/ProfileCardSkeleton";
import { CardHorizentalSkeleton } from "@components/Skeletons/CardHorizentalSkeleton";
import { Text } from '@components/Text';
/* Screens */
/* packages */
import axios from "axios";
import { Image } from 'expo-image';
import { View, TouchableOpacity, FlatList, RefreshControl } from "react-native"
import { useCallback, useContext, useEffect, useState } from "react";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
/* constants */
import { colors } from "@constants/colors";
import Api from '@utils/Api';
import { routes } from "@constants/routes";
import { icons } from "@constants/icons";
/* useContexts */
import { getToken } from "@functions/authToken";
import { AuthContext } from '@functions/AuthState';
import { useAuth } from "@context/AuthContext";
import { useProfile } from "@context/ProfileContext";
import Routes from "@utils/Routes";
/*--------------*/


export const ShowMyProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [pets, setPets] = useState([]);
  const [nbPets, setNbPets] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);

  const { BearerToken } = useAuth();
  const { profileState } = useProfile();

  useEffect(() => {
    if(BearerToken !== null) {
      fetchData();
    }
  }, [profileState]);

  useFocusEffect(
    useCallback(() => {
      
    }, [profileState])
  );

  const fetchData = () => {
    axios.get(Api.Server + Api.ShowMyProfileData, { headers: { Authorization: 'Bearer ' + BearerToken } })
      .then(response => {
        setIsLoading(false);
        const data = response.data;
        setUser(data.user)  //email, location, name, phone_number, pic, social_list, wolaya_name
        setPets(data.pets)  //id, birthday, description, gender_id, gender_name, images_preview, is_active, location, name, offer_type_id, offer_type_name, price, race_name, sub_race, wilaya_name, wilaya_number,
        setNbPets(data.pets.length)
      }).catch(error => {
        setIsLoading(true);
        console.error(error);
      });
  }

  const onRefresh = async () => {
    setRefreshing(true);
    // Run your refresh function here
    await fetchData();
    setRefreshing(false);
  };
  const handleNavigate = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: routes.SHOWMYPROFILE + 'm5',
        params: { id: 123 },
      })
      )
  };

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
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              ListHeaderComponent={() => {
                return (
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 7 }}>
                      <Text weight="700" style={{ marginHorizontal: 20, fontSize: 17, color: colors.menu}}>My Profile</Text>
                    </View>
                    <ProfileCard navigation={navigation} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text weight="700" style={{ marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: colors.menu}}>My Pets</Text>
                      <Text weight="400" style={{ marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: colors.menu }}>
                        {nbPets} pet{nbPets > 0 ? 's' : ''}
                      </Text>
                    </View>
                    {pets.length == 0 ? (
                      <View style={{justifyContent: 'center',alignItems: 'center', marginTop: 50}}>
                        <Text style={{marginBottom: 7}}>You Haven't posted any pet</Text>
                        <TouchableOpacity 
                          onPress={() => { navigation.navigate(Routes.m4) }}
                          style={{backgroundColor: colors.maleBackground, paddingHorizontal: 10, paddingVertical:7, borderRadius: 7, width: '70%', marginHorizontal: 'auto'}}>
                          <Text style={{color: colors.button, fontSize: 18, textAlign: 'center'}}>Post a pet</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
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

const ProfileText = ({ data, placeholder, icon = null }) => {
  return (
    <>
      <Image source={ icons.LOCATION } />
      <Text style={{ textDecorationLine: data == null ? 'line-through' : 'none', opacity: data == null ? 0.5 : 1 }} >{data == null ? placeholder : data}</Text>
    </>
  )
}

const ProfileCard = ({ navigation }) => {
  const { profileState } = useProfile();

  return (
    <View style={{ marginBottom: 20 }}>
      <View>
        <View style={{ backgroundColor: colors.white, borderRadius: 10, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <View>
              <ProfileText data={profileState.name} placeholder={'name'} />
              <Text weight="600">{profileState.email}</Text>
              <ProfileText data={profileState.location} placeholder={'location'} icon={icons.LOCATION}/>
              <ProfileText data={profileState.phone_number} placeholder={'phone number'} />
            </View>
            <View>
              {profileState.pic ? (
                <Image source={{ uri: profileState.pic }} style={{ width: 80, height: 80, borderRadius: 10 }} />
              ) : (
                <View style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: colors.emptyImg1 }}></View>
              )}
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(routes.EDITPROFILE)} style={{ backgroundColor: colors.menu, padding: 7 }}>
              {!profileState.location || !profileState.phone_number || !profileState.name 
              ? (
                <Text style={{ color: colors.white, textAlign: 'center' }}>Complete my Profile</Text>
              )
              : (
                <Text style={{ color: colors.white, textAlign: 'center' }}>Edit</Text>
              )
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}