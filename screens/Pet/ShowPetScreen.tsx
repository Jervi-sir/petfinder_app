import { View, Text, Image, TouchableOpacity } from "react-native"
import { HeaderSearch } from "../../components/HeaderSearch"
import { StatusBar } from "../../components/StatusBar"
import {FlatListSlider} from 'react-native-flatlist-slider';
import { COLORS } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

export const ShowPetScreen = () => {
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
  return(
    <>
      <StatusBar />
      <HeaderSearch />
      <ScrollView style={{margin: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', backgroundColor: COLORS.white, flex:1}}>
        <View style={{position: 'relative'}}>
          <FlatListSlider
            data={images}
            height={240}
            timer={5000}
            onPress={item => alert(JSON.stringify(item))}
            indicatorContainerStyle={{position:'absolute', bottom: 20}}
            indicatorActiveColor={COLORS.menu}
            indicatorInActiveColor={COLORS.background}
            indicatorActiveWidth={30}
            animation
          />
          <TouchableOpacity style={{position: 'absolute', top: 2, left: 2}}>
            <Image source={require('../../assets/icons/back.png')} style={{ width: 50, height: 50 }}/>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 17, paddingVertical: 10}}>
          <View style={{marginBottom: 7}}>
            <Text style={{fontSize: 20, fontWeight: "500", color:COLORS.menu}}>Pet Name</Text>
            <Text style={{fontSize: 12, fontWeight: "400", color:COLORS.menu, marginBottom: 5}}>Race</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
              <Image source={require('../../assets/icons/location.png')} style={{width:20, height: 20}}/>
              <Text style={{fontSize: 13, fontWeight: "400", color:COLORS.menu}}>Location - Wilaya</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={{backgroundColor: COLORS.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20}}>
              <Text style={{fontSize: 12, fontWeight: "400", color:COLORS.white}}>2 Years</Text>
            </View>
            <View style={{backgroundColor: COLORS.maleBackground, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20}}>
              <Text style={{fontSize: 12, fontWeight: "400", color:COLORS.maleText}}>Male</Text>
            </View>
            <View style={{backgroundColor: COLORS.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20}}>
              <Text style={{fontSize: 12, fontWeight: "400", color:COLORS.white}}>2Kg</Text>
            </View>
            <View style={{backgroundColor: COLORS.black, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 5, marginRight: 20}}>
              <Text style={{fontSize: 12, fontWeight: "400", color:COLORS.white}}>Noir</Text>
            </View>
          </View>
          <View style={{marginBottom: 17}}>
            <Text style={{fontSize: 12, fontWeight: '400'}}>
            Lorem ipsum dolor sit amet conseetur adisicing elit. Maxime mollitia,
  molestiae quas vel sint di repudiandae consequuntur voluptatum aborm numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
  optio, eaque 
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 21}}>
            <Image source={require('../../assets/icons/phone.png')} style={{width:20, height: 20  }}/>
            <Text style={{fontSize: 15, fontWeight: "400", color:COLORS.menu}}>phone number</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity>
              <Image source={require('../../assets/icons/like1.png')} style={{width:50, height: 50  }}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity>
                <Image source={require('../../assets/icons/call.png')} style={{width:50, height: 50, marginRight: 20  }}/>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: COLORS.menu, paddingVertical: 10, paddingHorizontal: 25, borderRadius: 5}}>
                <Text style={{fontSize: 13, fontWeight: "400", color:COLORS.white}}>Send message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}