import { Product } from '../types/types';

const getFavoriteProducts = async () => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

  const res = await fetch(
    `${strapiUrl}/api/favorite?populate=products.primaryImage&populate=products.secondaryImage`
  );

  const data = await res.json();

  const products = data.data.attributes.products.data as Product[];

  return products;
};
export default getFavoriteProducts;
