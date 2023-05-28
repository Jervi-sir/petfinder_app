import { View } from "react-native"
import { Dimensions } from 'react-native';
import { StatusBar as SB, Platform } from 'react-native';

const statusBarHeight = Platform.OS === 'android' ? SB.currentHeight : 40;
const phoneWidth = Dimensions.get('window').width;

export const StatusBar = () => {
  return (
    <View style={{
      height: statusBarHeight, 
      width: phoneWidth,
      backgroundColor: 'black'
      }}>
        <SB barStyle="light-content" />

    </View>
  )
}