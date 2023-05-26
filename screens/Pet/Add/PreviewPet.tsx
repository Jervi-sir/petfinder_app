import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { FlatListSlider } from 'react-native-flatlist-slider';
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { icons } from "@constants/icons";
import { colors } from "@constants/colors";
//import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import {Dimensions} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const PreviewPet = ({ route, navigation }) => {
  const {
    description, phoneNumber,
    gender, name, location, wilaya, race, subRace,
    age, date, weight, color,
    typeOffer, price, images
  } = route.params;
  console.log(images);
  const imageFromInput = [
    { image: images[0] }, { image: images[1] }, { image: images[2] }, { image: images[3] },
  ]
  let imagePreview = imageFromInput.filter(obj => obj.image !== "");

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <ScrollView style={{ margin: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', backgroundColor: colors.white, flex: 1 }}>
        <View style={{ position: 'relative' }}>
          <FlatListSlider
            data={imagePreview}
            height={WINDOW_WIDTH - 40}
            timer={5000}
            onPress={item => alert(JSON.stringify(item))}
            indicatorContainerStyle={{ position: 'absolute', bottom: 20 }}
            indicatorActiveColor={colors.menu}
            indicatorInActiveColor={colors.background}
            indicatorActiveWidth={30}
            animation
          />
          <TouchableOpacity onPress={handleGoBack} style={{ position: 'absolute', top: 2, left: 2 }}>
            <Image source={icons.BACK} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
          <View style={{ marginBottom: 7 }}>
            <Text style={{ fontSize: 20, fontWeight: "500", color: colors.menu }}>{name != '' ? name : 'name'}</Text>
            <Text style={{ fontSize: 12, fontWeight: "400", color: colors.menu, marginBottom: 5 }}>{race != '' ? race : 'race'} - {subRace != '' ? subRace : 'subRace'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Image source={icons.LOCATION} style={{ width: 20, height: 20 }} />
              <Text style={{ fontSize: 13, fontWeight: "400", color: colors.menu }}>{location != '' ? location : 'location'} - {wilaya != '' ? wilaya : 'wilaya'}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: "400", color: colors.white }}>{age != '' ? age : 'age'}</Text>
            </View>
            <View style={{
              paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20,
              backgroundColor: gender == 1 ? colors.maleBackground : gender == 2 ? colors.femaleBackground : gender == 3 ? colors.unkownBackground : 'white'
            }}>
              <Text style={{
                fontSize: 12, fontWeight: "400",
                color: gender == 1 ? colors.maleText : gender == 2 ? colors.femaleText : gender == 3 ? colors.unkownText : 'white'
              }}>
                {gender == 1 ? 'male' : gender == 2 ? 'female' : gender == 3 ? 'unknowm' : 'unknowm'}
              </Text>
            </View>
            <View style={{ backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: "400", color: colors.white }}>{weight != '' ? weight : 'weight'}</Text>
            </View>
            <View style={{ backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: "400", color: colors.white }}>{color != '' ? color : 'color'}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 17 }}>
            <Text style={{ fontSize: 12, fontWeight: '400' }}>
              {description != '' ? description : 'description'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 21 }}>
            <Image source={icons.PHONE} style={{ width: 20, height: 20 }} />
            <Text style={{ fontSize: 15, fontWeight: "400", color: colors.menu }}>{phoneNumber}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity>
              <Image source={icons.LIKE1} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity>
                <Image source={icons.CALL} style={{ width: 50, height: 50, marginRight: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: colors.menu, paddingVertical: 10, paddingHorizontal: 25, borderRadius: 5 }}>
                <Text style={{ fontSize: 13, fontWeight: "400", color: colors.white }}>Send message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

