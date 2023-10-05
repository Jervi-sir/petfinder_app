/* Components */
/* Screens */
/* packages */
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useContext } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {Dimensions} from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { Image } from 'expo-image';
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, TouchableOpacity, Animated } from "react-native"
/* constants */
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { GlobalVariable } from '@constants/GlobalVariable';
import { api } from "@constants/api";
import { routes } from "@constants/routes";
/* useContexts */
import { AuthContext } from "@functions/AuthState";
/* helpers */
import { calculateAge, makePhoneCall } from "@functions/helpers";
/*--------------*/
import _ from "lodash";
import Api from '@utils/Api';
import { useAuth } from '@context/AuthContext';
import Routes from '@utils/Routes';

const WINDOW_WIDTH = Dimensions.get('window').width;

/* input
  id, name, user_id, location, wilaya_name or wilaya_id, gender, date, offer_type_id, price, race_name, sub_race
  images
*/
export const ShowPetScreen = ({ route }) => {
  const navigation = useNavigation();
  const { petId, mine = false } = route.params;
  const [pet, setPet] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { BearerToken } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isButtonLocked, setButtonLocked] = useState(false);
  const [nbTries, setNbTries ] = useState(2)
  const [freezeTime, setFreezeTime] = useState(0);

  const borderRadius = new Animated.Value(100);

  const sampleImages = [
    {
      image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      desc: 'Silent Waters in the mountains in midst of Himilayas',
    }
  ]
  const skeletonWidth = new Animated.Value(0);

  Animated.loop(
    Animated.timing(skeletonWidth, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    })
  ).start();

  const loadingColor = 'rgba(51,58,90,0.2)';
  const loadingBackgroundColor = '#F5F5F5';
  const fullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const LessFullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '25%'] });
  const halfFullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '45%'] });
  const closeFullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '69%'] });

  const textAnimation = { width: fullWidthSkeletonAniamtion, height: 10, marginBottom: 7, backgroundColor: loadingColor, borderRadius: 10, };
  const textAnimationLessHalf = { width: LessFullWidthSkeletonAniamtion, height: 10, marginBottom: 7, backgroundColor: loadingColor, borderRadius: 10, };
  const textAnimationHalf = { width: halfFullWidthSkeletonAniamtion, height: 10, marginBottom: 7, backgroundColor: loadingColor, borderRadius: 10, };
  const textAnimationMoreHalf = { width: closeFullWidthSkeletonAniamtion, height: 10, marginBottom: 7, backgroundColor: loadingColor, borderRadius: 10, };
  const imageAnimation = { width: fullWidthSkeletonAniamtion, height: '100%', backgroundColor: loadingColor, borderRadius: 10, };

  useEffect(() => {
    if(BearerToken != null) {
      axios.get(Api.Server + Api.getPetAuth + petId, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + BearerToken } })
        .then(response => {
          const result = response.data.pet;
          setIsLoading(false);
          setPet(result);
          setIsLiked(result.is_liked);
          //setImages(result.images)
        })
    } else {
      axios.get(Api.Server + Api.getPet + petId)
        .then(response => {
          const result = response.data.pet;
          setIsLoading(false);
          setPet(result);
          //setImages(result.images)
        })
    }
  }, []);

  const LikeThisPet = (state) => {
    setNbTries(nbTries - 1);
    
    if(nbTries < 0) {
      setButtonLocked(true);
      let counter = 5;
      setFreezeTime(counter);
      let timerId = setInterval(function() {
        counter--;
        setFreezeTime(counter);
        if (counter < 0) {
          clearInterval(timerId);
        }
      }, 1000);
  
      return setTimeout(() => {
        setButtonLocked(false);
        setNbTries(2)
      }, 4000);
    }

    if(BearerToken != null) {
      if(state) {
        setIsLiked(true);
        axios.post(Api.Server + Api.SavePet, {
          pet_id: pet.id
        }, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + BearerToken } })
          .then(response => { console.log(response.data); })
          .catch(err => {
            setIsLiked(false);
            console.log(err.response.data)
          });
      } 
      else { 
        setIsLiked(false);
        axios.post(Api.Server + Api.unSavePet, {
          pet_id: pet.id,
        }, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + BearerToken } })
          .then(response => {
            console.log(response.data);
          })
          .catch(err => {
            setIsLiked(true);
            console.log(err)
          });
      }
    } else {
      setIsLiked(false);
      console.log('you are not logged in')
      navigation.navigate(Routes.Login)
    }
  }
 
  return (
    <>
      <ScrollView >
        <View style={{ margin: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', backgroundColor: colors.white, flex: 1 }}>
          <View style={{ position: 'relative' }}>
            {pet.images ? (
              <FlatListSlider
                data={pet.images}
                height={WINDOW_WIDTH - 40}
                timer={5000}
                onPress={item => {/*alert(JSON.stringify(item))*/ }}
                indicatorContainerStyle={{ position: 'absolute', bottom: 20 }}
                indicatorActiveColor={colors.menu}
                indicatorInActiveColor={colors.background}
                indicatorActiveWidth={30}
                animation
              />
            ) : (
              <View style={{ width: '100%', height: WINDOW_WIDTH - 40, backgroundColor: colors.emptyImg1 }}></View>
            )}

            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', top: 2, left: 2 }}>
              <Image source={icons.BACK} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
            <View style={{ marginBottom: 7 }}>
              {/**Name */}
              {isLoading ? (
                <Animated.View style={textAnimation}></Animated.View>
              ) : (
                <Text style={{ fontSize: 20, fontWeight: "500", color: colors.menu }}>{pet.name ? pet.name : 'no name'}</Text>
              )}

              {/**Race, subRace */}
              {isLoading ? (
                <Animated.View style={textAnimationMoreHalf}></Animated.View>
              ) : (
                <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
                  <Text style={{ fontSize: 13, fontWeight: "600", color: colors.menu, }}>{pet.race_name}</Text>
                  <Text style={{ fontSize: 13, fontWeight: "300", color: colors.menu, marginLeft: 5 }}>SubRace</Text>
                </View>
              )}

              {isLoading ? (
                <Animated.View style={textAnimationHalf}></Animated.View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <Image source={icons.LOCATION} style={{ width: 20, height: 20 }} />
                  <Text style={{ fontSize: 13, fontWeight: "400", color: colors.menu }}>{pet.location} - {pet.wilaya_name}</Text>
                </View>
              )}
            </View>

            {isLoading ? (
              <Animated.View style={textAnimationLessHalf}></Animated.View>
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {/**Age */}
                {pet.birthday ? (
                  <View style={{ backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20, marginBottom: 10, }}>
                    <Text style={{ fontSize: 12, fontWeight: "400", color: colors.white }}>{calculateAge(pet.birthday)}</Text>
                  </View>
                ) : null}

                {/**Gender */}
                <View style={{
                  paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20, marginBottom: 10,
                  backgroundColor: GlobalVariable.GenderBackgroundColor[pet.gender_id - 1]
                }}>
                  <Text style={{ fontSize: 12, fontWeight: "400", color: GlobalVariable.GenderTextColor[pet.gender_id - 1] }}>
                    {GlobalVariable.GenderText[pet.gender_id - 1]}
                  </Text>
                </View>
                {/**Weight */}
                {pet.weight ? (
                  <View style={{ backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20, marginBottom: 10, }}>
                    <Text style={{ fontSize: 12, fontWeight: "400", color: colors.white }}>{pet.weight != '' ? pet.weight : 'weight'}</Text>
                  </View>
                ) : null}
                {/**Color */}
                {pet.color ? (
                  <View style={{ backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20, marginBottom: 10, }}>
                    <Text style={{ fontSize: 12, fontWeight: "400", color: colors.white }}>{pet.color != '' ? pet.color : 'color'}</Text>
                  </View>
                ) : null}
              </View>
            )}


            {/**Description */}
            {isLoading ? (
              <Animated.View style={textAnimationHalf}></Animated.View>
            ) : (
              <View style={{ marginBottom: 17 }}>
                <Text style={{ fontSize: 12, fontWeight: '400' }}>
                  {pet.description}
                </Text>
              </View>
            )}

            {/**Phone number */}
            {isLoading ? (
              <Animated.View style={textAnimationLessHalf}></Animated.View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 21 }}>
                <Image source={icons.PHONE} style={{ width: 20, height: 20 }} />
                <Text style={{ fontSize: 15, fontWeight: "400", color: colors.menu }}>{pet.phone_number}</Text>
              </View>
            )}

            {/**Action */}
            {isLoading ? (
              <Animated.View style={[textAnimation, { height: 20 }]}></Animated.View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => { if(!isButtonLocked) LikeThisPet(!isLiked) }} >
                  <Animated.View style={{backgroundColor: isLiked == true ? colors.likedPet : colors.lightGrey, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: borderRadius}}>
                    <Image source={icons.LIKEWHITE} style={{ width: 22, height: 20 }} />
                  </Animated.View>
                  {
                    freezeTime > 0
                    && 
                    <Text style={{textAlign: 'center', position: 'absolute', bottom: '25%', right: -20}}>{freezeTime}s</Text>
                  }
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => { makePhoneCall(pet.phone_number) }}>
                    <Image source={icons.CALL} style={{ width: 50, height: 50, marginRight: 20 }} />
                  </TouchableOpacity>
                  {!mine ? (
                    <TouchableOpacity style={{ backgroundColor: colors.menu, paddingVertical: 10, paddingHorizontal: 25, borderRadius: 5 }}>
                      <Text style={{ fontSize: 13, fontWeight: "400", color: colors.white, width: 100, textAlign: 'center' }}>Send message</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => { navigation.navigate(routes.EDITPET, { petId: pet.id }) }} style={{ backgroundColor: colors.menu, paddingVertical: 10, paddingHorizontal: 25, borderRadius: 5 }}>
                      <Text style={{ fontSize: 13, fontWeight: "400", color: colors.white, width: 100, textAlign: 'center' }}>Edit Post</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            <View style={{ marginVertical: 30, width: '100%', height: 30 }}></View>
          </View>

        </View>
      </ScrollView>
    </>
  )
}

