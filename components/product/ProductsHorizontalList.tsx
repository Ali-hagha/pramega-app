import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';
import { Product } from '../../types/types';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import ProductCardSkeleton from '../skeleton/ProductCardSkeleton';

interface Props {
  title: string;
  queryKey: string;
  getProducts: () => Promise<Product[]>;
}

const ProductsHorizontalList = ({ title, getProducts, queryKey }: Props) => {
  const {
    data: products,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: getProducts,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      {isSuccess && (
        <FlatList
          data={products}
          renderItem={({ item, index }) => (
            <ProductCard product={item} index={index} />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
        />
      )}
      {/* show skeleton if not loaded */}
      {isLoading && (
        <ScrollView
          horizontal={true}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
        >
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <ProductCardSkeleton index={index} key={index} />
            ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ProductsHorizontalList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.md,
  },
  header: {
    paddingHorizontal: SIZES.md,
    fontFamily: FONTS.Montserrat_600,
    fontSize: SIZES.lg,
    color: COLORS.gray_600,
    marginBottom: SIZES.xs,
  },
});
