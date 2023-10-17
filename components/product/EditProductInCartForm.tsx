import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES } from '../../constants';
import { useCartFrom } from '@/hooks/useCartForm';

interface Props {
  productCountData: { id: number; quantity: number };
}

const EditProductInCartForm = ({
  productCountData: { id, quantity },
}: Props) => {
  const {
    handleDecrementProductCount,
    handleIncrementProductCount,
    handleDeleteProductFromCart,
    isMutationLoading,
  } = useCartFrom(id);

  return (
    <View style={styles.container}>
      <View style={styles.counterWrapper}>
        {quantity > 1 ? (
          <TouchableOpacity
            onPress={() => handleDecrementProductCount(quantity)}
            style={styles.counterBtn}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name="minus"
              size={SIZES.md}
              color={COLORS.gray_700}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleDeleteProductFromCart}
            style={styles.deleteBtn}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name="trash-alt"
              size={SIZES.xl}
              color={COLORS.gray_700}
            />
          </TouchableOpacity>
        )}
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Items in cart:</Text>
          {isMutationLoading ? (
            <ActivityIndicator
              color={COLORS.gray_700}
              size={'small'}
              style={{ width: SIZES.xl }}
            />
          ) : (
            <Text style={[styles.countText, styles.text]}>{quantity}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => handleIncrementProductCount(quantity)}
          disabled={quantity >= 6}
          style={[
            styles.counterBtn,
            quantity >= 6 && styles.counterBtnDisabled,
          ]}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="plus" size={SIZES.md} color={COLORS.gray_700} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProductInCartForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    padding: SIZES.md,
  },
  counterWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray_100,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.xxs,
    borderRadius: SIZES.md,
  },
  counterBtn: {
    padding: SIZES.md,
    borderRadius: SIZES.smp,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  counterBtnDisabled: {
    opacity: 0.3,
  },
  deleteBtn: {
    padding: SIZES.sm,
    borderRadius: SIZES.smp,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    fontFamily: FONTS.Montserrat_600,
    color: COLORS.gray_700,
    fontSize: SIZES.md,
    textAlign: 'center',
  },
  countText: {
    width: SIZES.xl,
  },
});
