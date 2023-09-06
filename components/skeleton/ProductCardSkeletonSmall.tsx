import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constans';
import PulseOpacity from '../animation/PulseOpacity';

const ProductCardSkeletonSmall = () => {
  return (
    <View style={styles.card}>
      <PulseOpacity style={styles.image}></PulseOpacity>
      <View style={styles.info}>
        <PulseOpacity style={styles.name}></PulseOpacity>
        <PulseOpacity style={styles.category}></PulseOpacity>
        <PulseOpacity style={styles.price}></PulseOpacity>
      </View>
    </View>
  );
};

export default ProductCardSkeletonSmall;

const styles = StyleSheet.create({
  image: {
    height: 184,
    width: 150,
    backgroundColor: COLORS.gray_300,
    borderRadius: SIZES.sm,
  },
  card: {
    padding: SIZES.xxs,
    backgroundColor: COLORS.gray_100,
    borderRadius: SIZES.md,
  },
  info: {
    padding: SIZES.sm,
    marginTop: SIZES.smp,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.sm,
  },
  name: {
    width: 100,
    height: SIZES.md,
    backgroundColor: COLORS.gray_300,
    marginBottom: SIZES.xxxs,
    borderRadius: SIZES.md,
  },
  category: {
    width: 40,
    height: SIZES.sm,
    backgroundColor: COLORS.gray_300,
    marginBottom: SIZES.xxs,
    borderRadius: SIZES.md,
  },
  price: {
    width: 35,
    height: SIZES.lg,
    backgroundColor: COLORS.gray_300,
    borderRadius: SIZES.md,
    marginBottom: SIZES.xxxxs,
  },
});
