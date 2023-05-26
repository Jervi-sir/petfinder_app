import { View, Text, Image, TouchableOpacity, Animated } from "react-native"
import { FlatListSlider } from 'react-native-flatlist-slider';
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import axios from 'axios';
import { api } from "@constants/api";
import { useEffect, useState } from "react";
import { calculateAge, makePhoneCall } from "@functions/helpers";
import { GlobalVariable } from '@constants/GlobalVariable';
//import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { routes } from "@constants/routes";
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';



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
    if (GlobalVariable.authToken) {
      axios.get(api.Server + api.getPet + petId, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GlobalVariable.authToken } })
        .then(response => {
          const result = response.data.pet;
          console.log(result);
          setIsLoading(false);
          setPet(result);
          //setImages(result.images)
        })
    } else {
      axios.get(api.Server + api.getPet + petId)
        .then(response => {
          const result = response.data.pet;
          setIsLoading(false);
          setPet(result);
          //setImages(result.images)
        })
    }
  }, []);


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
                ) : (<></>)}

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
                ) : (<></>)}
                {/**Color */}
                {pet.color ? (
                  <View style={{ backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20, marginBottom: 10, }}>
                    <Text style={{ fontSize: 12, fontWeight: "400", color: colors.white }}>{pet.color != '' ? pet.color : 'color'}</Text>
                  </View>
                ) : (<></>)}
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
                <Text style={{ fontSize: 15, fontWeight: "400", color: colors.menu }}>{pet.phoneNumber}</Text>
              </View>
            )}


            {/**Action */}
            {isLoading ? (
              <Animated.View style={[textAnimation, { height: 20 }]}></Animated.View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity>
                  <Image source={icons.LIKE1} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => { makePhoneCall(pet.phoneNumber) }}>
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