import { Product } from '../types/types';

const getOnSaleProducts = async () => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

  const res = await fetch(
    `${strapiUrl}/api/products?populate=primaryImage&populate=secondaryImage&filters[productTag][$eq]=sale`
  );

  const data = await res.json();

  const products = data.data as Product[];

  return products;
};
export default getOnSaleProducts;
