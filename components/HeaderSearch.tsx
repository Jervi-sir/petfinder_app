import {View, Image, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import DashedLine from 'react-native-dashed-line';
import { colors } from '@constants/colors';
import { useState } from 'react';

export const HeaderSearch = ({ onPress }) => {
  const [keywords, setKeywords] = useState('');
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 7}}>
        <Image style={{width: 69 - 20, height: 69 - 20, marginRight: 17}} source={require('@assets/icons/logo.png')} />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{flexDirection: 'row', flex:1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 7}}>
            <TextInput
              style={{ height: 40, borderColor: 'gray',flex: 1 ,paddingLeft: 5 }}
              placeholder="Insert your text!"
              onChangeText={(text) => {
                setKeywords(text);
              }}
            />
            <TouchableOpacity onPress={() => onPress(keywords)}>
              <Image style={{width: 40, height: 40}} source={require('@assets/icons/search.png')} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}