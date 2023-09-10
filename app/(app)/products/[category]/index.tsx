import React from 'react';
import ProductsPageContent from '../../../../components/product/ProductsPageContent';
import { router, useLocalSearchParams } from 'expo-router';
import getProductsByCategory from '../../../../api/getProductsByCategory';

const ProductsPage = () => {
  const { category } = useLocalSearchParams<{ category: string }>();

  if (!category) {
    return router.replace('/products');
  }

  return (
    <ProductsPageContent
      queryKey={['getProductsByCategory', category]}
      queryFunction={getProductsByCategory}
    />
  );
};

export default ProductsPage;
