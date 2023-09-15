import { StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import getProductById from '../../../../api/getProductById';
import { router } from 'expo-router';
import { COLORS, SIZES } from '../../../../constants';
import ProductImageGallery from '../../../../components/product/ProductImageGallery';
import ProductDetails from '../../../../components/product/ProductDetails';
import IconBtn from '../../../../components/ui/IconBtn';
import AddProductToCartForm from '../../../../components/product/AddProductToCartForm';
import ProductDetailPageSkeleton from '../../../../components/skeleton/ProductDetailPageSkeleton';
import { Feather } from '@expo/vector-icons';

const ProductDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

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

  if (isLoading) {
    return <ProductDetailPageSkeleton />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconBtn onPress={router.back}>
          <Feather
            name="chevron-left"
            size={SIZES.lg}
            color={COLORS.gray_500}
          />
        </IconBtn>
        <IconBtn onPress={() => router.push('/cart')}>
          <Feather
            name="shopping-cart"
            size={SIZES.lg}
            color={COLORS.gray_500}
          />
        </IconBtn>
      </View>
      {isSuccess && (
        <>
          <ScrollView>
            <ProductImageGallery
              images={product.attributes.imageGallery.data}
            />
            <ProductDetails product={product} />
            <View style={styles.filler}></View>
          </ScrollView>
          <AddProductToCartForm product={product} />
        </>
      )}
    </View>
  );
};

export default ProductDetailsPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  filler: {
    padding: SIZES.xxl,
  },
  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: SIZES.md,
  },
});
