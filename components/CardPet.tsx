import { Dimensions, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { View, Image, Text } from "react-native"
import { icons } from "@constants/icons";
import { useNavigation } from '@react-navigation/native';
import { routes } from "@constants/routes";
import { GlobalVariable } from './../constants/GlobalVariable';
import { displayAge } from './../functions/helpers';
import { colors } from "@constants/colors";
import axios from "axios";
import { api } from "@constants/api";
import { useEffect, useState } from "react";
import { getToken } from "@functions/authToken";

export const CardPet = ({ pet, viewPetRoute }) => {
  const navigation = useNavigation();
  const Dimension = Dimensions.get('window').width - 40;
  const CardWidth = Dimension / 2;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(pet.is_liked);
  }, []);

  const showPet = (itemId) => {
    navigation.navigate(viewPetRoute, { petId: itemId, mine: false });
  };

  const LikeThisPet = () => {
    if(getToken()) {
      if (isLiked != null) {
        setIsLiked(true);
        axios.post(api.Server + api.SavePet + pet.id, '', { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() } })
          .then(response => {

            console.log(response.data);
          })
          .catch(err => {
            setIsLiked(false);
            console.log(err)
          });
      } else {
        console.log('redicrect to null')
      }
    } else {
      setIsLiked(false);
      console.log('you are not logged in')
      navigation.navigate(routes.AUTH)
    }
  }

  const unLikeThisPet = () => {
    if (isLiked != null) {
      setIsLiked(false);
      axios.post(api.Server + api.unSavePet + pet.id, '', { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() } })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          setIsLiked(true);
          console.log(err)
        });
    } else {
      console.log('redicrect to null')
    }
  }

  return (
    <View style={{ width: CardWidth, backgroundColor: 'white', borderRadius: 15 }}>
      {/* preview Top */}
      <View style={{ position: 'relative', borderRadius: 15, overflow: 'hidden', }}>
        <TouchableWithoutFeedback onPress={() => showPet(pet.id)}>
          {pet.image_preview ? (
            <Image style={{ width: CardWidth, height: CardWidth, borderRadius: 10 }} source={{ uri: pet.image_preview }} />
          ) : (
            <View style={{ width: CardWidth, height: CardWidth, borderRadius: 10, backgroundColor: colors.emptyImg1 }}></View>
          )}
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => { return isLiked ? unLikeThisPet() : LikeThisPet() }} style={{ position: 'absolute', top: 7, right: 7, width: 40, height: 40, alignItems: 'flex-end' }}>
          <Image style={{ width: 25, height: 25, tintColor: isLiked ? colors.likedPet : undefined }} source={icons.LIKE2} />
        </TouchableOpacity>
        <View style={{ position: 'absolute', width: '100%', bottom: 0 }}>
          <Text style={{ color: 'white', backgroundColor: 'rgba(51, 58, 90, 0.5)', textAlign: 'center' }}>{pet.name}</Text>
        </View>
      </View>
      {/* details */}
      <TouchableWithoutFeedback onPress={() => showPet(pet.id)}>
        <View style={{ padding: 10 }}>
          {/* name and gender */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text>{pet.race_name}</Text>
            <View style={{ backgroundColor: GlobalVariable.GenderBackgroundColor[pet.gender_id - 1], paddingHorizontal: 10, borderRadius: 100 }}>
              <Text style={{ color: GlobalVariable.GenderTextColor[pet.gender_id - 1], fontSize: 12 }}>{GlobalVariable.GenderText[pet.gender_id - 1]}</Text>
            </View>
          </View>
          {/* Location */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Image style={{ width: 15, height: 15 }} source={icons.LOCATION} />
            <Text style={{ fontSize: 12 }}>{pet.wilaya_name} - {pet.location}</Text>
          </View>
          {/* age and price */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {pet.birthday ? (
              <Text style={{ fontSize: 12 }}>{displayAge(pet.birthday)}</Text>
            ) : (<Text></Text>)}
            
              <Text style={{ color: 'black', fontSize: 13 }}>{GlobalVariable.TypeOfferText[pet.offer_type_id - 1]}</Text>
            
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View >
  )
}