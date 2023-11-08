import { View, Text } from "react-native"
import LottieView from 'lottie-react-native';
import loading4 from '@assets/animations/loading4.json';
import { colors } from "@constants/colors";


export const LoadingWithMessage = (message) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        style={{ width: 100, height: 100 }}
        source={loading4}
        autoPlay
        duration={3000}
        loop={true}
      />
      <View style={{ backgroundColor: colors.menu, borderRadius: 15, paddingHorizontal: 20, paddingVertical: 5 }}>
        <Text style={{ textAlign: 'center', fontSize: 17, color: colors.background }}>Searching Nearest to Your Wilaya</Text>
      </View>
    </View>
  )
}