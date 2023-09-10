import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../../constants';
import { useGlobalSearchParams, usePathname } from 'expo-router';
import BottomNavItem from './BottomNavItem';

const BottomNav = () => {
  const { productId } = useGlobalSearchParams<{ productId: string }>();
  const pathname = usePathname();

  return (
    <View style={[styles.container, { display: productId ? 'none' : 'flex' }]}>
      <BottomNavItem href="/" iconName="home" />
      <BottomNavItem href="/products" iconName="package" />
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
});
