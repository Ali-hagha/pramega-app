import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../../constants';
import BottomNavItem from './BottomNavItem';
import { useQuery } from '@tanstack/react-query';
import { useCartContextData } from '../../../hooks/useCartContextData';
import getCartById from '../../../api/getCartById';

const BottomNav = () => {
  const { cartId } = useCartContextData();

  const { data: cartData, isSuccess } = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId),
    enabled: false,
  });

  const badgeCount = isSuccess
    ? cartData.attributes.products.data.length
    : undefined;

  return (
    <View style={styles.container}>
      <BottomNavItem href="/" iconName="home" />
      <BottomNavItem href="/products" iconName="package" />
      <BottomNavItem
        href="/cartBottomSheet"
        iconName="shopping-cart"
        badgeCount={badgeCount}
      />
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
