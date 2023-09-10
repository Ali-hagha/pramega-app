import React from 'react';
import ProductsPageContent from '../../../../components/product/ProductsPageContent';
import { router, useLocalSearchParams } from 'expo-router';
import { Categories, Featured } from '../../../../types/types';
import getProductsByCategoryAndFeatured from '../../../../api/getProductsByCategoryAndFeatured';

const ProductsPage = () => {
  const { category, featured } = useLocalSearchParams<{
    category: Categories;
    featured: Featured;
  }>();

  if (!category || !featured) {
    return router.replace('/products');
  }

  return (
    <ProductsPageContent
      queryKey={['getProductsByCategory', category, featured]}
      queryFunction={getProductsByCategoryAndFeatured}
    />
  );
};

export default ProductsPage;
