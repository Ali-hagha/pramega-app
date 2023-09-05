import { Product } from '../types/types';

const getAllProducts = async () => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

  const res = await fetch(
    `${strapiUrl}/api/products?populate=primaryImage&populate=secondaryImage`
  );

  const data = await res.json();

  const products = data.data as Product[];

  return products;
};
export default getAllProducts;
