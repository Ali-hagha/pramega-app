import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constans';
import PulseOpacity from '../animation/PulseOpacity';

interface Props {
  index: number;
}

const ProductCardSkeleton = ({ index }: Props) => {
  return (
    <View style={{ ...styles.card, marginStart: index === 0 ? SIZES.md : 0 }}>
      <PulseOpacity style={styles.image}></PulseOpacity>
      <View style={styles.info}>
        <PulseOpacity style={styles.name}></PulseOpacity>
        <PulseOpacity style={styles.category}></PulseOpacity>
        <PulseOpacity style={styles.price}></PulseOpacity>
      </View>
    </View>
  );
};

export default ProductCardSkeleton;

const styles = StyleSheet.create({
  image: {
    height: 184,
    width: 184,
    backgroundColor: COLORS.gray_300,
    borderRadius: SIZES.sm,
  },
  card: {
    padding: SIZES.xxs,
    backgroundColor: COLORS.gray_100,
    marginEnd: SIZES.xs,
    borderRadius: SIZES.md,
  },
  info: {
    padding: SIZES.sm,
    marginTop: SIZES.smp,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.sm,
  },
  name: {
    width: 110,
    height: SIZES.lg,
    backgroundColor: COLORS.gray_300,
    marginBottom: SIZES.xxxs,
    borderRadius: SIZES.md,
  },
  category: {
    width: 60,
    height: SIZES.smp,
    backgroundColor: COLORS.gray_300,
    marginBottom: SIZES.xxs,
    borderRadius: SIZES.md,
  },
  price: {
    width: 45,
    height: SIZES.xl,
    backgroundColor: COLORS.gray_300,
    borderRadius: SIZES.md,
    marginBottom: SIZES.xxxxs,
  },
});
