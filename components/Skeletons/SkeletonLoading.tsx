import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonLoading = () => {
  const skeletonWidth = new Animated.Value(0);

  React.useEffect(() => {
    const animateSkeleton = () => {
      Animated.loop(
        Animated.timing(skeletonWidth, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        })
      ).start();
    };

    animateSkeleton();

    return () => {
      skeletonWidth.stopAnimation();
    };
  }, []);

  const skeletonStyle = {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 20,
    width: skeletonWidth.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    }),
    marginVertical: 10,
  };
  const skeletonStyleHalf = {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 20,
    width: skeletonWidth.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '70%'],
    }),
    marginVertical: 10,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={skeletonStyle} >

      </Animated.View>
      <Animated.View style={skeletonStyle} >

      </Animated.View>
      <Animated.View style={skeletonStyleHalf} >

      </Animated.View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default SkeletonLoading;
