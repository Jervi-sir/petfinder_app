import { Dimensions } from "react-native"
import { View, Image, Text } from "react-native"

export const CardHome = () => {
  const Dimension = Dimensions.get('window').width - 40;
  const CardWidth = Dimension / 2;
  return (
    <View style={{width: CardWidth, backgroundColor: 'white', borderRadius: 15}}>
      {/* preview Top */}
      <View style={{ position: 'relative', borderRadius: 15, overflow: 'hidden',}}>
        <Image style={{width: CardWidth, height: CardWidth, borderRadius: 10}} source={require('../../assets/icons/pets/dog.png')} />
        <Image style={{width: 25, height: 25, position: 'absolute', top: 7, right: 7}} source={require('../../assets/icons/like2.png')} />
        <View style={{position: 'absolute', width: '100%', bottom: 0}}>
          <Text style={{color: 'white',backgroundColor: 'rgba(51, 58, 90, 0.5)', textAlign: 'center'}}>Foxy</Text>
        </View>
      </View>
      {/* details */}
      <View style={{padding: 10}}>
        {/* name and gender */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
          <Text>Name</Text>
          <View style={{backgroundColor: '#D9E2F5', paddingHorizontal: 10, borderRadius: 100}}>
            <Text style={{color: '#3A78E0', fontSize: 12}}>Male</Text>
          </View>
        </View>
        {/* Location */}
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Image style={{width: 15, height: 15}} source={require('../../assets/icons/location.png')} />
          <Text style={{fontSize: 12}}>Location where is it</Text>
        </View>
        {/* age and price */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 12}}>20 years</Text>
          <Text style={{color: 'black', fontSize: 13}}>Price</Text>
        </View>
      </View>
    </View>
  )
}