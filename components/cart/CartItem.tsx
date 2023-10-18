import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router } from "expo-router";

import { FontAwesome5 } from "@expo/vector-icons";

import { Product } from "../../types/types";
import { COLORS, FONTS, SIZES } from "../../constants";
import { currencyFormatter } from "../../helpers";
import CartProductCounter from "./CartProductCounter";
import { useCartFrom } from "@/hooks/useCartForm";

interface Props {
  product: Product;
  count: number;
}

const strapiUrl = process.env.EXPO_PUBLIC_STRAPI_URL;

const CartItem = ({ product, count }: Props) => {
  const { handleDeleteProductFromCart, isMutationLoading } = useCartFrom(
    product.id
  );

  const imgUrl = `${strapiUrl}${product.attributes.primaryImage.data.attributes.formats.small.url}`;

  const handleItemPress = () => {
    router.replace({
      pathname: "/products/[category]/[productId]",
      params: {
        category: product.attributes.category,
        productId: product.attributes.productId,
        id: product.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
        onPress={handleItemPress}
      >
        <View>
          <Image
            source={{
              uri: imgUrl,
            }}
            width={120}
            height={120}
            style={{
              resizeMode: "contain",
              borderRadius: SIZES.md,
            }}
          />
        </View>
      </Pressable>
      <View style={styles.info}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View>
            <Text style={styles.category}>{product.attributes.category}</Text>
            <Text style={styles.name}>{product.attributes.name}</Text>
          </View>
          {isMutationLoading ? (
            <ActivityIndicator
              color={COLORS.gray_400}
              size={"small"}
              style={{ width: SIZES.xl }}
            />
          ) : (
            <TouchableOpacity
              onPress={handleDeleteProductFromCart}
              style={styles.deleteBtn}
              activeOpacity={0.7}
            >
              <FontAwesome5
                name="trash-alt"
                size={SIZES.lg}
                color={COLORS.gray_400}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>
            {currencyFormatter.format(product.attributes.price * count)}
          </Text>
          <CartProductCounter count={count} productId={product.id} />
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: SIZES.xxs,
    backgroundColor: COLORS.white,
  },
  info: {
    paddingHorizontal: SIZES.sm,
    flex: 1,
  },
  priceWrapper: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    fontFamily: FONTS.Montserrat_500,
    color: COLORS.gray_500,
    fontSize: SIZES.smp,
    marginBottom: SIZES.xxxs,
  },
  name: {
    fontFamily: FONTS.Montserrat_600,
    color: COLORS.gray_700,
    fontSize: SIZES.mdp,
    marginBottom: SIZES.xxs,
  },
  deleteBtn: {
    padding: SIZES.xxs,
  },
  price: {
    fontFamily: FONTS.Montserrat_700,
    color: COLORS.gray_700,
    fontSize: SIZES.lg,
  },
});
