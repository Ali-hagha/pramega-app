import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "@/constants";
import { useBottomSheet } from "@gorhom/bottom-sheet";

const CartEmptyComponent = () => {
  const { close } = useBottomSheet();

  const handleCloseCart = () => {
    close();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your cart is empty.</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={handleCloseCart}
        activeOpacity={0.7}
      >
        <Text style={styles.btnText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartEmptyComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: SIZES.xl,
  },
  header: {
    fontFamily: FONTS.Montserrat_700,
    color: COLORS.gray_700,
    fontSize: SIZES.lg,
    marginBottom: SIZES.md,
  },
  btn: {
    backgroundColor: COLORS.gray_100,
    borderRadius: SIZES.sm,
    paddingHorizontal: SIZES.xxl,
    paddingVertical: SIZES.sm,
  },
  btnText: {
    fontFamily: FONTS.Montserrat_500,
    color: COLORS.gray_700,
    fontSize: SIZES.md,
  },
});
