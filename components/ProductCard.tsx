import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constans';
import { Product } from '../types/types';
import { currencyFormatter } from '../helpers';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface Props {
  product: Product;
  index: number;
}

const ProductCard = ({ product: { attributes }, index }: Props) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;
  const imgUrl = `${strapiUrl}${attributes.primaryImage.data.attributes.formats.small.url}`;
  return (
    <View style={{ ...styles.card, marginStart: index === 0 ? SIZES.md : 0 }}>
      <Link href={`products/${attributes.category}/${attributes.productId}`}>
        <View>
          <Image
            source={{
              uri: imgUrl,
            }}
            width={200}
            height={200}
          />
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {attributes.name}
            </Text>
            <Text style={styles.category}>{attributes.category}</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>
                {currencyFormatter.format(attributes.price)}
              </Text>
              <View style={styles.ratingWrapper}>
                <FontAwesome
                  name="star"
                  size={SIZES.lg}
                  color={COLORS.amber_400}
                />
                <Text style={styles.rating}>{attributes.rating}</Text>
              </View>
            </View>
          </View>
        </View>
      </Link>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.gray_100,
    marginEnd: SIZES.xs,
    borderRadius: SIZES.md,
    overflow: 'hidden',
  },
  info: {
    padding: SIZES.sm,
    margin: SIZES.xxs,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.sm,
  },
  ratingWrapper: {
    flexDirection: 'row',
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: FONTS.Montserrat_500,
    fontSize: SIZES.md,
    color: COLORS.gray_700,
    width: 140,
    marginBottom: SIZES.xxxxs,
  },
  category: {
    fontFamily: FONTS.Montserrat_400,
    fontSize: SIZES.smp,
    color: COLORS.gray_500,
    marginBottom: SIZES.xxs,
  },
  price: {
    fontFamily: FONTS.Montserrat_700,
    fontSize: SIZES.mdp,
    color: COLORS.gray_700,
  },
  rating: {
    fontFamily: FONTS.Montserrat_600,
    fontSize: SIZES.md,
    color: COLORS.gray_700,
    marginStart: SIZES.xxxxs,
  },
});
