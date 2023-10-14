import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import getCartById from '../api/getCartById';
import { CartData, CartPostData } from '../types/types';
import { useCartContextData } from './useCartContextData';
import { useCartMutation } from './useCartMutations';
import { router } from 'expo-router';

export const useCartFrom = (productId: number) => {
  const [productCount, setProductCount] = useState(1);
  const { createNewCartMutation, updateCartMutation } = useCartMutation();
  const queryClient = useQueryClient();
  const { cartId, cartUniqueId } = useCartContextData();

  const { data: cartData } = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId),
    enabled: false,
  });

  const handleAddToCart = () => {
    if (cartUniqueId && cartId && cartData) {
      updateExistingCart(cartData);
    } else {
      createNewCart();
    }
  };

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

  const createNewCart = () => {
    const cartData = buildNewCartObject();

    createNewCartMutation.mutate(cartData, {
      onSuccess: newCartData => {
        handleMutationSuccess(newCartData);
      },
    });
  };

  const updateExistingCart = (existingCartData: CartData) => {
    const updatedCartData = buildUpdatedCartObject(existingCartData);

    updateCartMutation.mutate(
      { data: updatedCartData, cartId },
      {
        onSuccess: newCartData => {
          handleMutationSuccess(newCartData);
        },
      }
    );
  };

  const buildNewCartObject = (): CartPostData => {
    const uuid = uuidv4();
    const newCartObject: CartPostData = {
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

    return newCartObject;
  };

  const buildUpdatedCartObject = (existingCartData: CartData): CartPostData => {
    const exitingProductIds = existingCartData.attributes.products.data
      .filter(p => p.id !== productId)
      .map(p => p.id);

    const existingProductCounts =
      existingCartData.attributes.productCount.filter(
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

    return updatedCartData;
  };

  const handleMutationSuccess = (newCartData: CartData) => {
    queryClient.setQueryData(['cartById', cartId], newCartData);
    router.push('/cartBottomSheet');
  };

  return {
    handleAddToCart,
    handleDecrementProductCount,
    handleIncrementProductCount,
    productCount,
    isMutationLoading:
      updateCartMutation.isLoading || createNewCartMutation.isLoading,
  };
};
