import { MetaData, Product } from '../types/types';

const getProductsByCategory = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number | undefined;
  queryKey: string[];
}) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;
  const category = queryKey[1];

  const res = await fetch(
    `${strapiUrl}/api/products?populate=primaryImage&populate=secondaryImage&filters[category][$eq]=${category}&pagination[page]=${pageParam}&pagination[pageSize]=8`
  );

  const data = await res.json();

  const products = data.data as Product[];
  const metaData = data.meta as MetaData;

  return { products, metaData };
};
export default getProductsByCategory;
