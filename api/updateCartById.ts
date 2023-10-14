import { CartData, CartPostData } from '../types/types';

const updateCartById = async ({
  data,
  cartId,
}: {
  data: CartPostData;
  cartId: string;
}) => {
  const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

  const res = await fetch(
    `${strapiUrl}/api/carts/${cartId}?populate=products.primaryImage`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  const responseData = await res.json();
  const cartData = responseData.data as CartData;

  return cartData;
};
export default updateCartById;
