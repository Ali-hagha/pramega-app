import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../../constans';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import getAllProducts from '../../../api/getAllProducts';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ProductCardSmall from '../../../components/product/ProductCardSmall';

const Products = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['allProducts'],
    queryFn: getAllProducts,
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCardSmall product={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scrollContentContainer}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
      />
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  scrollContentContainer: {
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xxxxs,
    gap: SIZES.xxs,
  },
});
