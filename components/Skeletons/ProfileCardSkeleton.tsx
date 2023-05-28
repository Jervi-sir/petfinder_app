import { colors } from '@constants/colors';
import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

export const ProfileCardSkeleton = () => {
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
  const fullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '90%'] });
  const halfFullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '45%'] });
  const closeFullWidthSkeletonAniamtion = skeletonWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '69%'] });

  const textAnimation = {
    width: fullWidthSkeletonAniamtion,
    height: 10,
    backgroundColor: loadingColor,
    borderRadius: 10,
  };
  const textAnimationHalf = {
    width: halfFullWidthSkeletonAniamtion,
    height: 10,
    backgroundColor: loadingColor,
    borderRadius: 10,
  };
  const textAnimationMoreHalf = {
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
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 7 }}>
        <Text style={{ marginHorizontal: 20, fontSize: 20, color: colors.menu, fontWeight: '600' }}>My Profile</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <View style={{ backgroundColor: colors.white, borderRadius: 10, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
            <View style={{ flex: 0.7 }}>
              <Animated.View style={[textAnimation, { marginBottom: 10 }]}></Animated.View>
              <Animated.View style={[textAnimationMoreHalf, { marginBottom: 10 }]}></Animated.View>
              <Animated.View style={[textAnimationHalf, { marginBottom: 10 }]}></Animated.View>
              <Animated.View style={[textAnimation, { marginBottom: 10 }]}></Animated.View>
            </View>
            <View style={{ flex: 0.3 }}>
              <View style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: 'rgba(51,58,90,0.1)' }}>
                <Animated.View style={imageAnimation}></Animated.View>
              </View>
            </View>
          </View>
          <View>
            <View style={{ backgroundColor: colors.menu, padding: 7 }}>
              <Animated.View style={textAnimation}></Animated.View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: colors.menu, fontWeight: '600' }}>My Pets</Text>
        <Text style={{ marginHorizontal: 20, marginBottom: 10, fontSize: 17, color: colors.menu }}>
          0 pet
        </Text>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

