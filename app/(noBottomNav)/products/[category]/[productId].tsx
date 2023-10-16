import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { COLORS, SIZES } from '@/constants';

import getProductById from '@/api/getProductById';
import getCartById from '@/api/getCartById';

import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductDetails from '@/components/product/ProductDetails';
import IconBtn from '@/components/ui/IconBtn';
import AddProductToCartForm from '@/components/product/AddProductToCartForm';
import ProductDetailPageSkeleton from '@/components/skeleton/ProductDetailPageSkeleton';

import { useCartContextData } from '@/hooks/useCartContextData';
import EditProductInCartForm from '@/components/product/EditProductInCartForm';

const ProductDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cartId } = useCartContextData();

  if (!id) {
    return router.replace('/');
  }

  const { data: cartData, isSuccess: isCartSuccess } = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId),
    enabled: false,
  });

  const badgeCount = cartData?.attributes.products.data.length;

  const currentProductCartCount = cartData?.attributes.productCount.find(
    p => p.id.toString() === id
  )?.quantity;

  console.log(currentProductCartCount);

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
        <IconBtn
          onPress={() => router.push('/cartBottomSheet')}
          badgeCount={badgeCount}
        >
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
          {currentProductCartCount ? (
            <EditProductInCartForm productCount={currentProductCartCount} />
          ) : (
            <AddProductToCartForm product={product} />
          )}
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
