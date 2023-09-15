import { createContext, useEffect, useState } from 'react';
import { CartContextValue } from '../types/types';
import {
  getCartIdFromAsyncStorage,
  getCartUniqueIdFromAsyncStorage,
} from '../helpers';

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string>('');
  const [cartUniqueId, setCartUniqueId] = useState<string>('');

  useEffect(() => {
    const getCartIds = async () => {
      const asyncCartUniqueId = await getCartUniqueIdFromAsyncStorage();
      const asyncCartId = await getCartIdFromAsyncStorage();

      if (!cartId || !cartUniqueId) {
        if (asyncCartId) {
          setCartId(asyncCartId);
        }
        if (asyncCartUniqueId) {
          setCartUniqueId(asyncCartUniqueId);
        }
      }
    };

    getCartIds();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartId, cartUniqueId, setCartId, setCartUniqueId }}
    >
      {children}
    </CartContext.Provider>
  );
};

const CartContext = createContext<CartContextValue | null>(null);

export { CartContext, CartContextProvider };
