import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

export const useCartContextData = () => {
  const cartContextData = useContext(CartContext);

  if (!cartContextData) {
    throw new Error(
      'useCartContextData has to be used within a <CartContext.provider>'
    );
  }

  return cartContextData;
};
