import {View, Text, Image, ScrollView, TextInput} from 'react-native'
import DashedLine from 'react-native-dashed-line';
import { colors } from '@constants/colors';

export const HeaderSearch = () => {
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', paddingRight: 10, paddingLeft: 10, paddingBottom: 10}}>
        <Image style={{width: 69, height: 69, marginRight: 17}} source={require('@assets/icons/logo.png')} />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{flexDirection: 'row', flex:1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 7}}>
            <TextInput
              style={{ height: 40, borderColor: 'gray',flex: 1 ,paddingLeft: 5 }}
              placeholder="Insert your text!"
              onChangeText={text => {
              }}
            />
            <Image style={{width: 40, height: 40}} source={require('@assets/icons/search.png')} />
          </View>
        </ScrollView>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />

    </>
  )
}