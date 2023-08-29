import { StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import getProductById from '../../../../../api/getProductById';
import { router } from 'expo-router';
import { COLORS } from '../../../../../constans';
import ProductImageGallery from '../../../../../components/product/ProductImageGallery';
import ProductDetails from '../../../../../components/product/ProductDetails';

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

  if (!product) {
    return <Text>loading</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen />
      {isSuccess && (
        <ScrollView>
          <ProductImageGallery images={product.attributes.imageGallery.data} />
          <ProductDetails product={product} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
