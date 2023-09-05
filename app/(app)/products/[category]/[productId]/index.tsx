import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import getProductById from '../../../../../api/getProductById';
import { router } from 'expo-router';
import { COLORS, SIZES } from '../../../../../constans';
import ProductImageGallery from '../../../../../components/product/ProductImageGallery';
import ProductDetails from '../../../../../components/product/ProductDetails';
import BackBtn from '../../../../../components/ui/BackBtn';
import AddProductToCartForm from '../../../../../components/product/AddProductToCartForm';
import ProductDetailPageSkeleton from '../../../../../components/skeleton/ProductDetailPageSkeleton';

const index = () => {
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
      <Stack.Screen />
      <BackBtn />
      {isSuccess && (
        <ScrollView>
          <ProductImageGallery images={product.attributes.imageGallery.data} />
          <ProductDetails product={product} />
          <View style={styles.filler}></View>
        </ScrollView>
      )}
      <AddProductToCartForm />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  filler: {
    padding: SIZES.xxl,
  },
});
