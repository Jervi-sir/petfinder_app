import { Text, View } from "react-native"
import { LogoHeader } from "./LogoHeader"
import DashedLine from "react-native-dashed-line"
import { colors } from "@constants/colors"

export const HeaderWithTitle = ({ title }) => {
  return (
    <>
      <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7}}>
        <LogoHeader />
        <Text style={{ fontSize: 30, fontWeight: "400", color: colors.button, paddingRight: 20 }}>{ title }</Text>
      </View>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}