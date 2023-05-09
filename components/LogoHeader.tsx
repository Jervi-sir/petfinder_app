import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image } from 'react-native';

export const LogoHeader = () => {
  const scaleStrat = 1.05;
  const scaleValue = useRef(new Animated.Value(scaleStrat)).current;

  const startBreathingAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: scaleStrat,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.linear
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => startBreathingAnimation());
  };

  useEffect(() => {
    startBreathingAnimation();
  }, []);

  const imageStyle = {
    width: 69 - 20,
    height: 69 - 20,
    transform: [{
      scale: scaleValue
    }],
  };

  return (
    <>
      <Animated.Image style={imageStyle} source={require('@assets/icons/logo.png')} />
    </>
  )
}