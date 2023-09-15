import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Product } from '../../types/types';
import { COLORS, FONTS, SIZES } from '../../constants';
import { currencyFormatter } from '../../helpers';
import CartProductCounter from './CartProductCounter';

interface Props {
  product: Product;
  count: number;
}

const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

const CartItem = ({ product, count }: Props) => {
  const imgUrl = `${strapiUrl}${product.attributes.primaryImage.data.attributes.formats.small.url}`;

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: imgUrl,
          }}
          width={120}
          height={120}
          style={{
            resizeMode: 'contain',
            borderRadius: SIZES.md,
          }}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{product.attributes.category}</Text>
        <Text style={styles.name}>{product.attributes.name}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>
            {currencyFormatter.format(product.attributes.price)}
          </Text>
          <CartProductCounter count={count} />
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SIZES.xxs,
    backgroundColor: COLORS.white,
  },
  info: {
    paddingHorizontal: SIZES.sm,
    flex: 1,
  },
  priceWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontFamily: FONTS.Montserrat_500,
    color: COLORS.gray_500,
    fontSize: SIZES.smp,
    marginBottom: SIZES.xxxs,
  },
  name: {
    fontFamily: FONTS.Montserrat_600,
    color: COLORS.gray_700,
    fontSize: SIZES.mdp,
    marginBottom: SIZES.xxs,
  },
  price: {
    fontFamily: FONTS.Montserrat_700,
    color: COLORS.gray_700,
    fontSize: SIZES.lg,
  },
});
