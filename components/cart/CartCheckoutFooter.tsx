import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { currencyFormatter } from "@/helpers";
import { COLORS, FONTS, SIZES } from "@/constants";
import { useCartContextData } from "@/hooks/useCartContextData";
import { useQuery } from "@tanstack/react-query";
import getCartById from "@/api/getCartById";

const CartCheckoutFooter = () => {
  const { cartId } = useCartContextData();

  const { data: cartData, isSuccess } = useQuery({
    queryKey: ["cartById", cartId],
    queryFn: () => getCartById(cartId),
    enabled: false,
  });

  if (!isSuccess) {
    return null;
  }

  const isCartEmpty = cartData.attributes.products.data.length === 0;

  if (isCartEmpty) {
    return null;
  }

  const products = cartData.attributes.products.data;
  const getProductPrice = (id: number) => {
    const price = products.find((p) => p.id === id)?.attributes.price;

    return price || 0;
  };

  const grandTotal = cartData.attributes.productCount.reduce((acc, curr) => {
    return acc + curr.quantity * getProductPrice(curr.id);
  }, 0);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Grand total:</Text>
        <Text style={styles.price}>{currencyFormatter.format(grandTotal)}</Text>
      </View>
      <TouchableOpacity
        disabled={isCartEmpty}
        style={[styles.btn, isCartEmpty && styles.btnDisabled]}
        activeOpacity={0.7}
        onPress={() => console.log("cart checkout")}
      >
        <Text style={styles.btnText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCheckoutFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xxs,
    backgroundColor: COLORS.white,
  },
  title: {
    fontFamily: FONTS.Montserrat_600,
    color: COLORS.gray_700,
    fontSize: SIZES.md,
    marginBottom: SIZES.xxs,
  },
  price: {
    fontFamily: FONTS.Montserrat_700,
    color: COLORS.gray_700,
    fontSize: SIZES.lg,
  },
  btn: {
    borderRadius: SIZES.md,
    backgroundColor: COLORS.gray_700,
    flexDirection: "row",
    padding: SIZES.md,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginStart: SIZES.xl,
  },
  btnDisabled: {
    opacity: 0.3,
  },

  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.Montserrat_600,
    fontSize: SIZES.md,
  },
});
