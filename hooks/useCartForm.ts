import { Product } from './../types/types';
import { useState } from 'react';
import { useCartMutation } from './useCartMutations';
import { CartPostData } from '../types/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@tanstack/react-query';
import getCartById from '../api/getCartById';
import { useCartContextData } from './useCartContextData';

export const useCartFrom = (productId: number) => {
  const [productCount, setProductCount] = useState(1);
  const { createNewCartMutation, updateCartMutation } = useCartMutation();
  const { cartId, cartUniqueId } = useCartContextData();

  const { data: cartData } = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId),
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
      const exitingProductIds = cartData.attributes.products.data
        .filter(p => p.id !== productId)
        .map(p => p.id);

      const existingProductCounts = cartData.attributes.productCount.filter(
        product => product.id !== productId
      );

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
