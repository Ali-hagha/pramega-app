import { CartData } from '../types/types';

const getCartById = async (cartId: string) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

  const res = await fetch(
    `${strapiUrl}/api/carts/${cartId}?populate=products.primaryImage`,
    {
      method: 'GET',
    }
  );

  const responseData = await res.json();
  const cartData = responseData.data as CartData;

  return cartData;
};
export default getCartById;
