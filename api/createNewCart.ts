import { setCartUniqueIdToAsyncStorage } from '../helpers';
import { CartData, CartPostData } from '../types/types';

const createNewCart = async (data: CartPostData) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

  const res = await fetch(`${strapiUrl}/api/carts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();
  const cartData = responseData.data as CartData;

  return cartData;
};
export default createNewCart;
