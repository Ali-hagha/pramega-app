import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constans';
import { Product } from '../types/types';
import ProductCard from './ProductCard';

interface Props {
  title: string;
  products: Product[];
}

const ProductsSlider = ({ title, products }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <ScrollView
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
      >
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductsSlider;

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
