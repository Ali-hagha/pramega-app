import { QueryKey } from '@tanstack/react-query';
import { Product } from '../types/types';

const getProductById = async (id: string) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

  const res = await fetch(
    `${strapiUrl}/api/products/${id}?populate=imageGallery`
  );

  const data = await res.json();

  const products = data.data as Product;

  return products;
};
export default getProductById;
