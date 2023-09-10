import React from 'react';
import getAllProducts from '../../../api/getAllProducts';
import ProductsPageContent from '../../../components/product/ProductsPageContent';

const ProductsPage = () => {
  return (
    <ProductsPageContent
      queryKey={['getAllProducts']}
      queryFunction={getAllProducts}
    />
  );
};

export default ProductsPage;
