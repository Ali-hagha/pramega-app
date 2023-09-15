import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../../constants';
import { useGlobalSearchParams } from 'expo-router';
import BottomNavItem from './BottomNavItem';

const BottomNav = () => {
  return (
    <View style={styles.container}>
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
