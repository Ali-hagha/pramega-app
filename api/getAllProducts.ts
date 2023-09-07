import { MetaData, Product } from '../types/types';

const getAllProducts = async ({ pageParam = 1 }) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

  const res = await fetch(
    `${strapiUrl}/api/products?populate=primaryImage&populate=secondaryImage&pagination[page]=${pageParam}&pagination[pageSize]=8`
  );

  const data = await res.json();

  const products = data.data as Product[];
  const metaData = data.meta as MetaData;

  return { products, metaData };
};
export default getAllProducts;
