import { createContext, useEffect, useState } from 'react';
import { CartContextValue } from '../types/types';
import {
  getCartIdFromAsyncStorage,
  getCartUniqueIdFromAsyncStorage,
} from '../helpers';

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartUniqueId, setCartUniqueId] = useState<string | null>(null);

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
    <CartContext.Provider value={{ cartId, cartUniqueId }}>
      {children}
    </CartContext.Provider>
  );
};

const CartContext = createContext<CartContextValue>({
  cartId: null,
  cartUniqueId: null,
});

export { CartContext, CartContextProvider };
