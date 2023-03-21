import { View, Text, Image, TouchableOpacity } from "react-native"
import {FlatListSlider} from 'react-native-flatlist-slider';
import { ScrollView } from "react-native-gesture-handler";
import { HeaderSearch } from "@components/HeaderSearch";
import { colors } from "@constants/colors";
import { icons } from "@constants/icons";
import axios from 'axios';
import { api } from "@constants/api";
import { useEffect, useState } from "react";
import { calculateAge } from "@functions/helpers";


/* input
  id, name, user_id, location, wilaya_name or wilaya_id, gender, date, offer_type_id, price, race_name, sub_race
  images
*/
export const ShowPetScreen = ({ route }) => {
  const { petId } = route.params;
  const [pet, setPet] = useState([]);
  const images = [
    {
     image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
     desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
   {
     image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
     desc:
       'Red fort in India New Delhi is a magnificient masterpeiece of humans',
   },
   ]

   useEffect(() => {
    axios.get(api.Server + api.getPet + petId)
     .then(response => {
      const result = response.data.pet;
      setPet(result);
     })
   })


  return(
    <>
      <ScrollView style={{margin: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', backgroundColor: colors.white, flex:1}}>
        <View style={{position: 'relative'}}>
          <FlatListSlider
            data={images}
            key={'image_url'}
            height={240}
            timer={5000}
            onPress={item => alert(JSON.stringify(item))}
            indicatorContainerStyle={{position:'absolute', bottom: 20}}
            indicatorActiveColor={colors.menu}
            indicatorInActiveColor={colors.background}
            indicatorActiveWidth={30}
            animation
          />
          <TouchableOpacity style={{position: 'absolute', top: 2, left: 2}}>
            <Image source={icons.BACK} style={{ width: 50, height: 50 }}/>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 17, paddingVertical: 10}}>
          <View style={{marginBottom: 7}}>
            <Text style={{fontSize: 20, fontWeight: "500", color:colors.menu}}>{pet.name ? pet.name : 'no name'}</Text>
            <Text style={{fontSize: 12, fontWeight: "400", color:colors.menu, marginBottom: 5}}>{ pet.race_name }</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
              <Image source={icons.LOCATION} style={{width:20, height: 20}}/>
              <Text style={{fontSize: 13, fontWeight: "400", color:colors.menu}}>{ pet.location } - { pet.wilaya_name }</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={{backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20}}>
              <Text style={{fontSize: 12, fontWeight: "400", color:colors.white}}>{/* calculateAge(pet.date) */}</Text>
            </View>
            <View style={{backgroundColor: colors.maleBackground, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20}}>
              <Text style={{fontSize: 12, fontWeight: "400", color:colors.maleText}}>{ pet.gender }</Text>
            </View>
            <View style={{backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20}}>
              <Text style={{fontSize: 12, fontWeight: "400", color:colors.white}}>{ pet.weight }</Text>
            </View>
            <View style={{backgroundColor: colors.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20}}>
              <Text style={{fontSize: 12, fontWeight: "400", color:colors.white}}>{ pet.color }</Text>
            </View>
          </View>
          <View style={{marginBottom: 17}}>
            <Text style={{fontSize: 12, fontWeight: '400'}}>
            { pet.description }
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 21}}>
            <Image source={icons.PHONE} style={{width:20, height: 20  }}/>
            <Text style={{fontSize: 15, fontWeight: "400", color:colors.menu}}>{ pet.phone_number }</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity>
              <Image source={icons.LIKE1} style={{width:50, height: 50  }}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity>
                <Image source={icons.CALL} style={{width:50, height: 50, marginRight: 20  }}/>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: colors.menu, paddingVertical: 10, paddingHorizontal: 25, borderRadius: 5}}>
                <Text style={{fontSize: 13, fontWeight: "400", color:colors.white}}>Send message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}