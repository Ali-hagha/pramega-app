import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, useSegments } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../../constants';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Badge from '../Badge';

const AnimatedFeather = Animated.createAnimatedComponent(Feather);

interface Props {
  href: string;
  iconName: 'home' | 'package' | 'grid' | 'shopping-cart';
  badgeCount?: number;
}

const BottomNavItem = ({ href, iconName, badgeCount }: Props) => {
  const segments = useSegments();

  const active = `/${segments[1] || ''}` === href ? 1 : 0;
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

          <Badge count={badgeCount} />
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
    width: 80,
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    width: SIZES.xl,
    height: SIZES.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.gray_100,
    right: 0,
  },
  badgeText: {
    fontFamily: FONTS.Montserrat_500,
    color: COLORS.gray_700,
    fontSize: SIZES.sm,
  },
});
