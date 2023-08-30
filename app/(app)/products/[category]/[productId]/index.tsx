import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import getProductById from '../../../../../api/getProductById';
import { router } from 'expo-router';
import { COLORS } from '../../../../../constans';
import ProductImageGallery from '../../../../../components/product/ProductImageGallery';
import ProductDetails from '../../../../../components/product/ProductDetails';
import BackBtn from '../../../../../components/ui/BackBtn';

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
    <View style={styles.container}>
      <Stack.Screen />
      <BackBtn />
      {isSuccess && (
        <ScrollView style={{ paddingTop: 0 }}>
          <ProductImageGallery images={product.attributes.imageGallery.data} />
          <ProductDetails product={product} />
        </ScrollView>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
