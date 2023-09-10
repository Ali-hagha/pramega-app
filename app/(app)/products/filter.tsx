import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import ProductsPageContent from '../../../components/product/ProductsPageContent';
import { Featured } from '../../../types/types';
import getProductsByFeatured from '../../../api/getProductsByFeatured';

const FilteredProductsPage = () => {
  const { featured } = useLocalSearchParams<{ featured: Featured }>();

  if (!featured) {
    return router.replace('/products');
  }

  return (
    <ProductsPageContent
      queryKey={['getProductsByFeatured', featured]}
      queryFunction={getProductsByFeatured}
    />
  );
};

export default FilteredProductsPage;
