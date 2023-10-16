import { useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';
import getCartById from '../api/getCartById';
import { CartData, CartPostData } from '../types/types';
import { useCartContextData } from './useCartContextData';
import { useCartMutation } from './useCartMutations';

export const useCartFrom = (productId: number) => {
  const { createNewCartMutation, updateCartMutation } = useCartMutation();
  const queryClient = useQueryClient();
  const { cartId, cartUniqueId } = useCartContextData();

  const { data: cartData } = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId),
    enabled: false,
  });

  const handleAddToCart = (productCount: number) => {
    if (cartUniqueId && cartId && cartData) {
      updateExistingCart(cartData, productCount);
    } else {
      createNewCart(productCount);
    }
  };

  const handleIncrementProductCount = (productCount: number) => {
    if (cartData && productCount < 6) {
      updateExistingCart(cartData, productCount + 1);
    }
  };

  const handleDecrementProductCount = (productCount: number) => {
    if (cartData && productCount > 1) {
      updateExistingCart(cartData, productCount - 1);
    }
  };

  const handleDeleteProductFromCart = () => {
    if (cartData) {
      deleteProductFromCart(cartData);
    }
  };

  const createNewCart = (productCount: number) => {
    const cartData = buildNewCartObject(productCount);

    createNewCartMutation.mutate(cartData, {
      onSuccess: newCartData => {
        handleMutationSuccess(newCartData);
      },
    });
  };

  const updateExistingCart = (
    existingCartData: CartData,
    productCount: number
  ) => {
    const updatedCartData = buildUpdatedCartObject(
      existingCartData,
      productCount
    );

    updateCartMutation.mutate(
      { data: updatedCartData, cartId },
      {
        onSuccess: newCartData => {
          handleMutationSuccess(newCartData);
        },
      }
    );
  };

  const deleteProductFromCart = (existingCartData: CartData) => {
    const updatedCartData =
      builCartObjectWithoutCurrentProduct(existingCartData);

    updateCartMutation.mutate(
      { data: updatedCartData, cartId },
      {
        onSuccess: newCartData => {
          handleMutationSuccess(newCartData);
        },
      }
    );
  };

  const buildNewCartObject = (productCount: number): CartPostData => {
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

  const buildUpdatedCartObject = (
    existingCartData: CartData,
    productCount: number
  ): CartPostData => {
    const { existingProductCounts, exitingProductIds } =
      getCartWithoutCurrentProduct(existingCartData);

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

  const builCartObjectWithoutCurrentProduct = (existingCartData: CartData) => {
    const { existingProductCounts, exitingProductIds } =
      getCartWithoutCurrentProduct(existingCartData);

    const updatedCartData: CartPostData = {
      data: {
        products: exitingProductIds,
        productCount: existingProductCounts,

        cartUniqueId: cartUniqueId,
      },
    };

    return updatedCartData;
  };

  const getCartWithoutCurrentProduct = (existingCartData: CartData) => {
    const exitingProductIds = existingCartData.attributes.products.data
      .filter(p => p.id !== productId)
      .map(p => p.id);

    const existingProductCounts =
      existingCartData.attributes.productCount.filter(
        product => product.id !== productId
      );

    return { exitingProductIds, existingProductCounts };
  };

  const handleMutationSuccess = (newCartData: CartData) => {
    queryClient.setQueryData(['cartById', cartId], newCartData);
    router.push('/cartBottomSheet');
  };

  return {
    handleAddToCart,
    handleDecrementProductCount,
    handleIncrementProductCount,
    handleDeleteProductFromCart,
    isMutationLoading:
      updateCartMutation.isLoading || createNewCartMutation.isLoading,
  };
};
