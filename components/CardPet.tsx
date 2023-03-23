import { Dimensions, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { View, Image, Text } from "react-native"
import { icons } from "@constants/icons";
import { useNavigation } from '@react-navigation/native';
import { routes } from "@constants/routes";
import { GlobalVariable } from './../constants/GlobalVariable';
import { calculateAge } from './../functions/helpers';
import { colors } from "@constants/colors";

export const CardPet = ({ pet }) => {
  const navigation = useNavigation();
  const Dimension = Dimensions.get('window').width - 40;
  const CardWidth = Dimension / 2;

  const showPet = (itemId) => {
    navigation.navigate(routes.VIEWPET, { petId: itemId });
  };

  const LikeThisPet = () => {
  }

  const ViewThisPet = () => {

  }
  return (
    <View style={{width: CardWidth, backgroundColor: 'white', borderRadius: 15}}>
      {/* preview Top */}
      <View style={{ position: 'relative', borderRadius: 15, overflow: 'hidden',}}>
        <TouchableWithoutFeedback onPress={() => showPet(pet.id)}>
          {pet.image_preview ? (
            <Image style={{width: CardWidth, height: CardWidth, borderRadius: 10}} source={{uri: pet.image_preview }} />
          ) : (
            <View style={{width: CardWidth, height: CardWidth, borderRadius: 10, backgroundColor: colors.emptyImg1}}></View>
          )}
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={LikeThisPet} style={{position: 'absolute', top: 7, right: 7}}>
          <Image style={{width: 25, height: 25}} source={icons.LIKE2} />
        </TouchableOpacity>
        <View style={{position: 'absolute', width: '100%', bottom: 0}}>
          <Text style={{color: 'white',backgroundColor: 'rgba(51, 58, 90, 0.5)', textAlign: 'center'}}>{ pet.name }</Text>
        </View>
      </View>
      {/* details */}
      <View style={{padding: 10}}>
        {/* name and gender */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
          <Text>{ pet.race_name }</Text>
          <View style={{backgroundColor: GlobalVariable.GenderBackgroundColor[pet.gender_id], paddingHorizontal: 10, borderRadius: 100}}>
            <Text style={{color: GlobalVariable.GenderTextColor[pet.gender_id], fontSize: 12}}>{ GlobalVariable.GenderText[pet.gender_id] }</Text>
          </View>
        </View>
        {/* Location */}
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Image style={{width: 15, height: 15}} source={icons.LOCATION} />
          <Text style={{fontSize: 12}}>{ pet.wilaya_name } - { pet.location }</Text>
        </View>
        {/* age and price */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {pet.birthday ? (
            <Text style={{fontSize: 12}}>{ calculateAge(pet.birthday) }</Text>
          ) : (<Text></Text>)}
          {pet.offer_type_id == 0 ? (
            <Text style={{color: 'black', fontSize: 13}}>{ GlobalVariable.TypeOfferText[pet.offer_type_id] }</Text>
          ) : (
            <Text style={{color: 'black', fontSize: 13}}>{ pet.price }</Text>
          )}
        </View>
      </View>
    </View>
  )
}