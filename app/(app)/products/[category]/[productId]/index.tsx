import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import getProductById from '../../../../../api/getProductById';
import { router } from 'expo-router';
import { COLORS, FONTS, SIZES } from '../../../../../constans';
import { currencyFormatter } from '../../../../../helpers';
import { FontAwesome } from '@expo/vector-icons';
import ImageCarousel from '../../../../../components/ui/ImageCarousel';

const index = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

  if (!id) {
    return router.replace('/');
  }

  const {
    data: product,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['productById', id],
    queryFn: () => getProductById(id),
  });

  if (!product) {
    return <Text>loading</Text>;
  }

  const width = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen />
      {isSuccess && (
        <ScrollView>
          <View style={{ aspectRatio: 1 }}>
            <ImageCarousel
              data={product.attributes.imageGallery.data}
              renderItem={({ item }) => (
                <Image
                  source={{
                    uri: `${strapiUrl}${item.attributes.formats.medium.url}`,
                  }}
                  width={width}
                  height={width}
                  style={styles.image}
                />
              )}
            />
          </View>
          <View style={styles.info}>
            <View>
              <Text style={styles.name}>{product.attributes.name}</Text>

              <View style={styles.ratingWrapper}>
                <Text style={styles.category}>
                  {product.attributes.category}
                </Text>
                <View style={styles.row}>
                  <Text
                    style={styles.ratingCount}
                  >{`${product.attributes.ratingCount} Reviews`}</Text>
                  <FontAwesome
                    name="star"
                    size={SIZES.lg}
                    color={COLORS.amber_400}
                  />
                  <Text style={styles.rating}>{product.attributes.rating}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.price}>
              {currencyFormatter.format(product.attributes.price)}
            </Text>
            <Text style={styles.description}>
              {product.attributes.description}
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  image: {
    backgroundColor: COLORS.gray_100,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
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
