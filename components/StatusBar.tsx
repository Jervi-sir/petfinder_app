import { colors } from "@constants/colors";
import { View } from "react-native"
import { Dimensions } from 'react-native';
import { StatusBar as SB, Platform } from 'react-native';

const statusBarHeight = Platform.OS == 'android' ? 0 : 35;
const phoneWidth = Dimensions.get('window').width;

export const StatusBar = () => {
  return (
    <View style={{
      height: statusBarHeight, 
      width: phoneWidth,
      backgroundColor: colors.black
      }}>
        <SB barStyle="light-content" />
    </View>
  )
}