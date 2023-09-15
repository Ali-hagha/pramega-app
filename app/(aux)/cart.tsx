import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomBottomSheet from '../../components/ui/bottomSheet/CustomBottomSheet';
import { useQuery } from '@tanstack/react-query';
import getCartById from '../../api/getCartById';
import { FlatList } from 'react-native-gesture-handler';
import { useCartContextData } from '../../hooks/useCartContextData';
import { CartData } from '../../types/types';
import CartItem from '../../components/cart/CartItem';

const Cart = () => {
  const { cartId } = useCartContextData();

  const { data: cartData, isSuccess } = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId),
    enabled: false,
  });

  const getProductCount = (id: number, cartData: CartData) => {
    return cartData.attributes.productCount.find(count => count.id === id)!
      .quantity;
  };

  return (
    <CustomBottomSheet>
      <View style={{ flex: 1 }}>
        {isSuccess && (
          <FlatList
            data={cartData.attributes.products.data}
            renderItem={({ item }) => (
              <CartItem
                product={item}
                count={getProductCount(item.id, cartData)}
              />
            )}
          />
        )}
      </View>
    </CustomBottomSheet>
  );
};

export default Cart;

const styles = StyleSheet.create({});
