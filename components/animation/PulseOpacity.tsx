import { StyleProp, ViewStyle } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  style: StyleProp<ViewStyle>;
}

const PulseOpacity = ({ style }: Props) => {
  const sv = useSharedValue(0.3);

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: sv.value,
  }));
  return <Animated.View style={[style, animatedStyle]}></Animated.View>;
};

export default PulseOpacity;
