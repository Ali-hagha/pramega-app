import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constans';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import getAllProducts from '../../../api/getAllProducts';
import { ScrollView } from 'react-native-gesture-handler';
import ProductCard from '../../../components/product/ProductCard';

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
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {isSuccess &&
          products.map(product => {
            return <ProductCard key={product.id} product={product} index={0} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
