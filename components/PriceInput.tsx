import { colors } from '@constants/colors';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutAnimation, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export const PriceInput = ({ isVisible, onChangeText, value, label}) => {
  const [animation] = useState(new Animated.Value(0));
  
  const toggleCollapsibleView = () => {
    const animationConfig = {
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    };
    Animated.timing(animation, {
      toValue: !isVisible ? 0 : 1,
      duration: animationConfig.duration,
      useNativeDriver: false,
    }).start(() => {
      // Run LayoutAnimation after animation completes
      LayoutAnimation.configureNext(animationConfig.update);
    });
  };

  useEffect(() => {
    toggleCollapsibleView();
  }, [isVisible]);


  return (
    <>
      <Animated.View style={{
        overflow: 'hidden',
        height: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 57],
        }),
      }}>
        <TextInput
          placeholder={label}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          style={styles.inputField}
        />
      </Animated.View>
    </>
  );

}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: colors.background,
    marginBottom: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
