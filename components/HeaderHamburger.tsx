import {View, Text, Image, TouchableOpacity} from 'react-native'
import DashedLine from 'react-native-dashed-line';
import { colors } from '@constants/colors';

export const HeaderHamburger = () => {
  return (
    <>
     <View style={{  flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 7}}>
        <Image style={{width: 69 - 20, height: 69 - 20, marginRight: 17}} source={require('@assets/icons/logo.png')} />
        <TouchableOpacity>
          
        </TouchableOpacity>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}