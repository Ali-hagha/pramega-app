import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomBottomSheet from '../../components/ui/bottomSheet/CustomBottomSheet';
import { useQuery } from '@tanstack/react-query';
import getCartById from '../../api/getCartById';
import { FlatList } from 'react-native-gesture-handler';
import { useCartContextData } from '../../hooks/useCartContextData';

const Cart = () => {
  const { cartId } = useCartContextData();

  const { data: cartData, isSuccess } = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId),
    enabled: false,
  });

  return (
    <CustomBottomSheet>
      <View style={{ flex: 1 }}>
        {isSuccess && (
          <FlatList
            data={cartData.attributes.products.data}
            renderItem={({ item }) => <Text>{item.attributes.name}</Text>}
          />
        )}
      </View>
    </CustomBottomSheet>
  );
};

export default Cart;

const styles = StyleSheet.create({});
