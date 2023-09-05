import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constans';
import PulseOpacity from '../animation/PulseOpacity';

const ProductDetailPageSkeleton = () => {
  return (
    <View style={styles.container}>
      <PulseOpacity style={styles.image}></PulseOpacity>
      <PulseOpacity style={styles.name}></PulseOpacity>
      <View style={styles.row}>
        <PulseOpacity style={styles.category}></PulseOpacity>
        <PulseOpacity style={styles.rating}></PulseOpacity>
      </View>
      <PulseOpacity style={styles.price}></PulseOpacity>
    </View>
  );
};

export default ProductDetailPageSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: SIZES.md,
    paddingTop: SIZES.xxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SIZES.lg,
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    backgroundColor: COLORS.gray_200,
    borderRadius: SIZES.md,
    marginBottom: SIZES.md,
  },
  name: {
    backgroundColor: COLORS.gray_200,
    borderRadius: SIZES.xxl,
    height: SIZES.xxl,
    width: 200,
    marginBottom: SIZES.xxs,
  },
  category: {
    backgroundColor: COLORS.gray_200,
    borderRadius: SIZES.xxl,
    height: SIZES.lg,
    width: 80,
  },
  rating: {
    backgroundColor: COLORS.gray_200,
    borderRadius: SIZES.xxl,
    height: SIZES.lg,
    width: 110,
  },

  price: {
    backgroundColor: COLORS.gray_200,
    borderRadius: SIZES.xxxl,
    height: SIZES.xxxl,
    width: 100,
  },
});
