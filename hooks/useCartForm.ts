import { useQuery, useQueryClient } from '@tanstack/react-query';
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
      addProductToCart(cartData, productCount);
    } else {
      createNewCart(productCount);
    }
  };

  const handleIncrementProductCount = (productCount: number) => {
    if (cartData && productCount < 6) {
      updateProductCount(cartData, productCount + 1);
    }
  };

  const handleDecrementProductCount = (productCount: number) => {
    if (cartData && productCount > 1) {
      updateProductCount(cartData, productCount - 1);
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
      onSuccess: (newCartData) => {
        updateCartCacheFromMutation(newCartData);
      },
    });
  };

  const addProductToCart = (
    existingCartData: CartData,
    productCount: number
  ) => {
    const updatedCartData = buildAddedProductCartObject(
      existingCartData,
      productCount
    );

    updateCartMutation.mutate(
      { data: updatedCartData, cartId },
      {
        onSuccess: (newCartData) => {
          updateCartCacheFromMutation(newCartData);
        },
      }
    );
  };

  const updateProductCount = (
    existingCartData: CartData,
    productCount: number
  ) => {
    const updatedCartData = buildUpdatedCountCartObject(
      existingCartData,
      productCount
    );

    updateCartMutation.mutate(
      { data: updatedCartData, cartId },
      {
        onSuccess: (newCartData) => {
          updateCartCacheFromMutation(newCartData);
        },
      }
    );
  };

  const deleteProductFromCart = (existingCartData: CartData) => {
    const updatedCartData =
      buildCartObjectWithoutCurrentProduct(existingCartData);

    updateCartMutation.mutate(
      { data: updatedCartData, cartId },
      {
        onSuccess: (newCartData) => {
          updateCartCacheFromMutation(newCartData);
        },
      }
    );
  };

  const buildAddedProductCartObject = (
    existingCartData: CartData,
    productCount: number
  ): CartPostData => {
    const productIdsInCart = existingCartData.attributes.products.data.map(
      (p) => p.id
    );
    const productCountInCart = existingCartData.attributes.productCount;

    const updatedCartData: CartPostData = {
      data: {
        products: [...productIdsInCart, productId],
        productCount: [
          ...productCountInCart,
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

  const buildUpdatedCountCartObject = (
    existingCartData: CartData,
    productCount: number
  ): CartPostData => {
    const productIdsInCart = existingCartData.attributes.products.data.map(
      (p) => p.id
    );
    const productCountInCart = existingCartData.attributes.productCount;

    const updatedCartData: CartPostData = {
      data: {
        products: productIdsInCart,
        productCount: [
          ...productCountInCart.filter((p) => p.id !== productId),
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

  const buildCartObjectWithoutCurrentProduct = (existingCartData: CartData) => {
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
      .filter((p) => p.id !== productId)
      .map((p) => p.id);

    const existingProductCounts =
      existingCartData.attributes.productCount.filter(
        (product) => product.id !== productId
      );

    return { exitingProductIds, existingProductCounts };
  };

  const updateCartCacheFromMutation = (newCartData: CartData) => {
    queryClient.setQueryData(['cartById', cartId], newCartData);
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
