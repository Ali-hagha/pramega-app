import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';
import { Product } from '../../types/types';
import { currencyFormatter } from '../../helpers';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface Props {
  product: Product;
}

const ProductCardSmall = ({ product: { attributes, id } }: Props) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;
  const imgUrl = `${strapiUrl}${attributes.primaryImage.data.attributes.formats.small.url}`;
  return (
    <View style={styles.card}>
      <Link
        href={{
          pathname: '/products/[category]/[productId]',
          params: {
            category: attributes.category,
            productId: attributes.productId,
            id,
          },
        }}
        asChild
      >
        <Pressable>
          {attributes.productTag && (
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>{attributes.productTag}</Text>
            </View>
          )}
          <Image
            source={{
              uri: imgUrl,
            }}
            width={200}
            height={200}
            style={{
              flex: 1,
              resizeMode: 'contain',
              width: '100%',
            }}
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
                  size={SIZES.md}
                  color={COLORS.amber_400}
                />
                <Text style={styles.rating}>{attributes.rating}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

export default ProductCardSmall;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.gray_100,
    borderRadius: SIZES.md,
    overflow: 'hidden',
    flexBasis: '47%',
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
  tagContainer: {
    paddingVertical: SIZES.xxxxs,
    paddingHorizontal: SIZES.xxs,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xxs,
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    top: SIZES.xxs,
    left: SIZES.xxs,
    zIndex: 10,
  },
  tagText: {
    fontFamily: FONTS.Montserrat_600,
    fontSize: SIZES.smp,
    color: COLORS.gray_500,
  },
  name: {
    fontFamily: FONTS.Montserrat_500,
    fontSize: SIZES.smp,
    color: COLORS.gray_700,
    width: 120,
    marginBottom: SIZES.xxxxs,
  },
  category: {
    fontFamily: FONTS.Montserrat_400,
    fontSize: SIZES.sm,
    color: COLORS.gray_500,
    marginBottom: SIZES.xxs,
  },
  price: {
    fontFamily: FONTS.Montserrat_600,
    fontSize: SIZES.md,
    color: COLORS.gray_700,
  },
  rating: {
    fontFamily: FONTS.Montserrat_500,
    fontSize: SIZES.smp,
    color: COLORS.gray_700,
    marginStart: SIZES.xxxxs,
  },
});
