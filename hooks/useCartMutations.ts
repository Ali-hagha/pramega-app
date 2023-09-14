import { useMutation } from '@tanstack/react-query';
import createNewCart from '../api/createNewCart';
import updateCartById from '../api/updateCartById';
import { CartData } from '../types/types';
import {
  setCartIdToAsyncStorage,
  setCartUniqueIdToAsyncStorage,
} from '../helpers';

export const useCartMutation = () => {
  const createNewCartMutation = useMutation({
    mutationFn: createNewCart,
    onSuccess: (data: CartData) => {
      setCartIdToAsyncStorage(data.id.toString());
      setCartUniqueIdToAsyncStorage(data.attributes.cartUniqueId);
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: updateCartById,
  });

  return { createNewCartMutation, updateCartMutation };
};
