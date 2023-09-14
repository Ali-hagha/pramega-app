import { useContext, useState } from 'react';
import { useCartMutation } from './useCartMutations';
import { CartPostData } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@tanstack/react-query';
import getCartById from '../api/getCartById';
import { CartContext } from '../context/cartContext';

export const useCartFrom = (productId: number) => {
  const [productCount, setProductCount] = useState(1);
  const { createNewCartMutation, updateCartMutation } = useCartMutation();
  const { cartId, cartUniqueId } = useContext(CartContext);

  const { data: cartData } = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId!),
    enabled: false,
  });

  const handleIncrementProductCount = () => {
    setProductCount(prevCount => {
      if (prevCount < 6) return prevCount + 1;
      return prevCount;
    });
  };

  const handleDecrementProductCount = () => {
    setProductCount(prevCount => {
      if (prevCount <= 1) return prevCount;
      return prevCount - 1;
    });
  };

  const handleAddToCart = () => {
    if (cartUniqueId && cartId && cartData) {
      const exitingProductIds = cartData.attributes.products.data.map(
        p => p.id
      );

      const existingProductCounts = cartData.attributes.productCount;

      const updatedCartData: CartPostData = {
        data: {
          products: [...exitingProductIds, productId],
          productCount: [
            ...existingProductCounts,
            {
              id: productId,
              quantity: productCount,
            },
          ],
          cartUniqueId: cartUniqueId,
        },
      };

      updateCartMutation.mutate({ data: updatedCartData, cartId });
    } else {
      const uuid = uuidv4();
      const cartData: CartPostData = {
        data: {
          products: [productId],
          productCount: [
            {
              id: productId,
              quantity: productCount,
            },
          ],
          cartUniqueId: uuid,
        },
      };

      createNewCartMutation.mutate(cartData);
    }
  };

  return {
    handleAddToCart,
    handleDecrementProductCount,
    handleIncrementProductCount,
    productCount,
  };
};
