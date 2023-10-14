import { useMutation, useQueryClient } from '@tanstack/react-query';
import createNewCart from '../api/createNewCart';
import updateCartById from '../api/updateCartById';
import { CartData } from '../types/types';
import {
  setCartIdToAsyncStorage,
  setCartUniqueIdToAsyncStorage,
} from '../helpers';
import { useCartContextData } from './useCartContextData';

export const useCartMutation = () => {
  const queryClient = useQueryClient();
  const { setCartId, setCartUniqueId } = useCartContextData();

  const createNewCartMutation = useMutation({
    mutationFn: createNewCart,
    onSuccess: (data: CartData) => {
      const cartId = data.id.toString();
      const uuid = data.attributes.cartUniqueId;

      setCartIdToAsyncStorage(cartId);
      setCartUniqueIdToAsyncStorage(uuid);

      setCartId(cartId);
      setCartUniqueId(uuid);

      queryClient.invalidateQueries({ queryKey: ['cartById', cartId] });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: updateCartById,
    onSuccess: (data: CartData) => {
      const cartId = data.id.toString();

      queryClient.invalidateQueries({ queryKey: ['cartById', cartId] });
    },
  });

  return { createNewCartMutation, updateCartMutation };
};
