import { Dimensions, TouchableWithoutFeedback } from "react-native"
import { View, Animated } from "react-native"
import { useNavigation } from '@react-navigation/native';

export const CardVerticalSkeleton = () => {
  const navigation = useNavigation();
  const Dimension = Dimensions.get('window').width - 40;
  const CardWidth = Dimension / 2;
  const skeletonWidth = new Animated.Value(0);

  Animated.loop(
    Animated.timing(skeletonWidth, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    })
  ).start();

  const loadingColor = 'rgba(51,58,90,0.2)';
  const loadingBackgroundColor = '#F5F5F5';
  const fullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const closeFullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '69%'] });
  const textAnimation = {
    width: fullWidthSkeletonAniamtion,
    height: 10,
    backgroundColor: loadingColor,
    borderRadius: 10,
  };
  const textAnimationHalf = {
    width: closeFullWidthSkeletonAniamtion,
    height: 10,
    backgroundColor: loadingColor,
    borderRadius: 10,
  };
  const imageAnimation = {
    width: fullWidthSkeletonAniamtion,
    height: '100%',
    backgroundColor: loadingColor,
    borderRadius: 10,
  };

  return (
    <>
      <View style={{ width: CardWidth, backgroundColor: 'white', borderRadius: 15 }}>
        {/* preview Top */}
        <View style={{ position: 'relative', borderRadius: 15, overflow: 'hidden', }}>
          <TouchableWithoutFeedback >
            <View style={{ width: CardWidth, height: CardWidth, borderRadius: 10, backgroundColor: 'rgba(51,58,90,0.1)' }}>
              <Animated.View style={imageAnimation}></Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* details */}
        <TouchableWithoutFeedback >
          <View style={{ padding: 10 }}>
            {/* name and gender */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Animated.View style={textAnimation}></Animated.View>
            </View>
            {/* Location */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Animated.View style={textAnimation}></Animated.View>
            </View>
            {/* age and price */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Animated.View style={textAnimationHalf}></Animated.View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}