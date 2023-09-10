import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Product } from '../../types/types';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { currencyFormatter } from '../../helpers';

interface Props {
  product: Product;
}

const ProductDetails = ({ product }: Props) => {
  return (
    <View style={styles.info}>
      <View>
        <Text style={styles.name}>{product.attributes.name}</Text>

        <View style={styles.ratingWrapper}>
          <Text style={styles.category}>{product.attributes.category}</Text>
          <View style={styles.row}>
            <Text
              style={styles.ratingCount}
            >{`${product.attributes.ratingCount} Reviews`}</Text>
            <FontAwesome name="star" size={SIZES.lg} color={COLORS.amber_400} />
            <Text style={styles.rating}>{product.attributes.rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.price}>
        {currencyFormatter.format(product.attributes.price)}
      </Text>
      <Text style={styles.description}>{product.attributes.description}</Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  info: {
    padding: SIZES.md,
  },
  name: {
    fontFamily: FONTS.Montserrat_700,
    fontSize: SIZES.xl,
    color: COLORS.gray_800,
    marginBottom: SIZES.xxs,
  },
  category: {
    fontFamily: FONTS.Montserrat_500,
    fontSize: SIZES.smp,
    color: COLORS.gray_600,
  },
  ratingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.md,
  },
  ratingCount: {
    fontFamily: FONTS.Montserrat_500,
    fontSize: SIZES.smp,
    color: COLORS.gray_500,
    marginEnd: SIZES.xs,
  },
  rating: {
    fontFamily: FONTS.Montserrat_600,
    fontSize: SIZES.md,
    color: COLORS.gray_600,
    marginStart: SIZES.xxxxs,
  },
  price: {
    fontFamily: FONTS.Montserrat_700,
    fontSize: SIZES.xxl,
    color: COLORS.gray_700,
    marginBottom: SIZES.md,
  },
  description: {
    fontFamily: FONTS.Montserrat_500,
    fontSize: SIZES.md,
    color: COLORS.gray_600,
  },
});
