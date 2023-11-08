import { Text, View, Image } from "react-native"
import { LogoHeader } from "./LogoHeader"
import DashedLine from "react-native-dashed-line"
import { colors } from "@constants/colors"

export const HeaderWithTitle = ({ title }) => {
  return (
    <>
      <View style={{ position: 'relative', }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7}}>
          <LogoHeader />
          <Text style={{ fontSize: 30, fontWeight: "400", color: colors.button, paddingRight: 20 }}>{ title }</Text>
          
        </View>
        <View style={{position: 'absolute', top: 0, left: 5, width: '100%', zIndex: -1,}}>
          <Image
            source={require('@assets/animal3.gif')}
            style={{ width: '100%', height: 60 }}
          />
        </View>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}