import { View, Text, Image, TouchableOpacity } from 'react-native'
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import { calculateAge } from "@functions/helpers";
import { useNavigation } from '@react-navigation/native';
import { routes } from '@constants/routes';
import { GlobalVariable } from '@constants/GlobalVariable';

export const PetCard = ({ pet }) => {
  const navigation = useNavigation();
  const gender = ['male', 'female', 'unknown'];
  const offerType = ['Adoption', 'Sale', 'rent'];

  return (
    <TouchableOpacity
      onPress={() => { navigation.navigate(routes.SHOWPET, { petId: pet.id, mine: true }) }}
      style={{ marginBottom: 10 }}
      activeOpacity={0.8}
      tvParallaxProperties={{
        enabled: true,
        tiltAngle: 0.2,
        pressDelay: 0.5
      }}
    >
      <View style={{ backgroundColor: colors.white, padding: 5, borderRadius: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: 99, height: 99, overflow: 'hidden', justifyContent: 'flex-end', borderRadius: 10 }}>
            {!pet.image_preview ? (
              <Image source={icons.CATIMG} style={{ width: 99, height: 99 }} />
            ) : (
              <Image source={{ uri: pet.image_preview }} style={{ width: 99, height: 99, borderRadius: 10 }} />
            )}
          </View>
          <View style={{ flex: 1, paddingLeft: 20, justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: colors.menu }}>{pet.name ? pet.name : 'unknown'}</Text>
            <Text style={{ fontSize: 14, fontWeight: '400', color: colors.lightGrey }}>{pet.race_name ? pet.race_name : 'unknown'}</Text>
            <Text style={{ fontSize: 14, fontWeight: '400', color: colors.lightGrey }}>{pet.description ? pet.description : 'unknown'}</Text>
            <Text style={{ fontSize: 13, fontWeight: '500', color: colors.menu }}>{offerType[pet.offer_type_id - 1]}</Text>
          </View>
          <View >
            <View style={{ backgroundColor: GlobalVariable.GenderBackgroundColor[pet.gender_id], borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginBottom: 11 }}>
              <Text style={{ color: GlobalVariable.GenderTextColor[pet.gender_id], textAlign: 'center', fontSize: 13 }}>{GlobalVariable.GenderText[pet.gender_id]}</Text>
            </View>
            {pet.birthday ? (
              <View style={{ backgroundColor: colors.lightWhite, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 }}>
                <Text style={{ color: colors.menu, textAlign: 'center', fontSize: 13 }}>{calculateAge(pet.birthday)}</Text>
              </View>
            ) : (<></>)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}