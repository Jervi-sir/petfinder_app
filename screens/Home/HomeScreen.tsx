import {View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import {Keyboard} from 'react-native'

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor:'#EBEAEF', flex: 1}}>
      {/* Top */}
      <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 10}}>
        <Image style={{width: 69, height: 69}} source={require('../../assets/icons/logo.png')} />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex: 1,height: 40,}}>
          <View style={{flexDirection: 'row', flex:1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 7}}>
            <TextInput
              style={{ 
                height: 40, 
                borderColor: 'gray',
                flex: 1 ,
                paddingLeft: 5
              }}
              placeholder="Insert your text!"
            />
            <Image style={{width: 40, height: 40}} source={require('../../assets/icons/search.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* Dotted Line */}
      <View style={{
          borderStyle: 'dashed',
          borderWidth: 1,
        }}>
      </View>
      {/* pet filter */}
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, width: 69-10, height: 69-10, alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{width: 45, height: 45}} source={require('../../assets/icons/filter.png')} />
          <Text>Cat</Text>
        </TouchableOpacity>
      </View>
      {/* title */}
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text>New Pets</Text>
        <Image style={{width: 30, height: 30}} source={require('../../assets/icons/filter1.png')} />
      </View>
      {/* cards result list */}
      <View>
        {/* card */}
        <View style={{width: 175,backgroundColor: 'white', borderRadius: 15}}>
          {/* preview Top */}
          <View style={{ position: 'relative', borderRadius: 15, overflow: 'hidden',}}>
            <Image style={{width: 175, height: 175, borderRadius: 10}} source={require('../../assets/icons/pets/dog.png')} />
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
      </View>
    </SafeAreaView>
  )
}