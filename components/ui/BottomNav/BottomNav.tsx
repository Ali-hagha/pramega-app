import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../../constants';
import { Link, useGlobalSearchParams, usePathname } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import BottomNavItem from './BottomNavItem';

const BottomNav = () => {
  const { productId } = useGlobalSearchParams<{ productId: string }>();
  const pathname = usePathname();

  return (
    <View style={[styles.container, { display: productId ? 'none' : 'flex' }]}>
      <BottomNavItem href="/" iconName="home" />
      <BottomNavItem href="/products" iconName="package" />
      <BottomNavItem href="/categories" iconName="grid" />
      <BottomNavItem href="/cart" iconName="shopping-cart" />
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.xxs,
    elevation: SIZES.xxxl,
    justifyContent: 'space-between',
  },
  btn: {
    borderRadius: SIZES.md,
    padding: SIZES.md,
  },
});
