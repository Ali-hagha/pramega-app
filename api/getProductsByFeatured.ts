import { MetaData, Product } from '../types/types';

const getProductsByFeatured = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number | undefined;
  queryKey: string[];
}) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;
  const featured = queryKey[1];

  const res = await fetch(
    `${strapiUrl}/api/products?populate=primaryImage&populate=secondaryImage&filters[productTag][$eq]=${featured}&pagination[page]=${pageParam}&pagination[pageSize]=8`
  );

  const data = await res.json();

  const products = data.data as Product[];
  const metaData = data.meta as MetaData;

  return { products, metaData };
};
export default getProductsByFeatured;
