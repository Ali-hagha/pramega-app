import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Link, usePathname } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../../constans';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedFeather = Animated.createAnimatedComponent(Feather);

interface Props {
  href: string;
  iconName: 'home' | 'package' | 'grid' | 'shopping-cart';
}

const BottomNavItem = ({ href, iconName }: Props) => {
  const pathname = usePathname();

  const active = pathname === href ? 1 : 0;
  const progress = useSharedValue(1 - active);

  progress.value = withTiming(1 - active, { duration: 150 });

  const animatedBtnIcon = useAnimatedProps(() => {
    return {
      color: interpolateColor(
        progress.value,
        [0, 1],
        [COLORS.gray_700, COLORS.gray_400]
      ),
    };
  });

  const animatedBtnBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [COLORS.primary, COLORS.white]
      ),
    };
  });

  return (
    <Link href={href} asChild>
      <Pressable>
        <Animated.View style={[styles.btn, animatedBtnBackground]}>
          <AnimatedFeather
            name={iconName}
            size={SIZES.xl}
            animatedProps={animatedBtnIcon}
          />
        </Animated.View>
      </Pressable>
    </Link>
  );
};

export default BottomNavItem;

const styles = StyleSheet.create({
  btn: {
    borderRadius: SIZES.md,
    padding: SIZES.smp,
  },
});
