import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomBottomSheet from '../../components/ui/bottomSheet/CustomBottomSheet';

const Cart = () => {
  return (
    <CustomBottomSheet>
      <View style={{ flex: 1 }}>
        <Text>Cart</Text>
      </View>
    </CustomBottomSheet>
  );
};

export default Cart;

const styles = StyleSheet.create({});
