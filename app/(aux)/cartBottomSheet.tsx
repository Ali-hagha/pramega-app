import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomBottomSheet from '../../components/ui/bottomSheet/CustomBottomSheet';
import { useQuery } from '@tanstack/react-query';
import getCartById from '../../api/getCartById';
import { useCartContextData } from '../../hooks/useCartContextData';
import { CartData } from '../../types/types';
import CartItem from '../../components/cart/CartItem';
import CartEmptyComponent from '@/components/cart/CartEmptyComponent';
import { BottomSheetFlatList, BottomSheetFooter } from '@gorhom/bottom-sheet';
import CartCheckoutFooter from '@/components/cart/CartCheckoutFooter';

const cartBottomSheet = () => {
  const { cartId } = useCartContextData();

  const { data: cartData, isSuccess } = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId),
    enabled: false,
  });

  const getProductCount = (id: number, cartData: CartData) => {
    const count = cartData.attributes.productCount.find(
      (count) => count.id === id
    )?.quantity;

    return count ?? 0;
  };

  return (
    <CustomBottomSheet footerComponent={<CartCheckoutFooter />}>
      <View style={{ flex: 1 }}>
        {isSuccess && (
          <BottomSheetFlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            ListEmptyComponent={<CartEmptyComponent />}
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

export default cartBottomSheet;

const styles = StyleSheet.create({});
