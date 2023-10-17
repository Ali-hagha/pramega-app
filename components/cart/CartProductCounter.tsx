import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { useCartFrom } from '@/hooks/useCartForm';

interface Props {
  count: number;
  productId: number;
}

const CartProductCounter = ({ count, productId }: Props) => {
  const {
    handleDecrementProductCount,
    handleIncrementProductCount,
    isMutationLoading,
  } = useCartFrom(productId);

  return (
    <View style={styles.counterWrapper}>
      <TouchableOpacity
        disabled={count <= 1}
        style={[styles.counterBtn, count <= 1 && styles.counterBtnDisabled]}
        onPress={() => handleDecrementProductCount(count)}
      >
        <FontAwesome5 name="minus" size={SIZES.sm} color={COLORS.gray_700} />
      </TouchableOpacity>

      {isMutationLoading ? (
        <ActivityIndicator
          color={COLORS.gray_400}
          size={'small'}
          style={{ width: SIZES.xl }}
        />
      ) : (
        <Text style={styles.countText}>{count}</Text>
      )}
      <TouchableOpacity
        disabled={count >= 6}
        style={[styles.counterBtn, count >= 6 && styles.counterBtnDisabled]}
        activeOpacity={0.7}
        onPress={() => handleIncrementProductCount(count)}
      >
        <FontAwesome5 name="plus" size={SIZES.sm} color={COLORS.gray_700} />
      </TouchableOpacity>
    </View>
  );
};

export default CartProductCounter;

const styles = StyleSheet.create({
  counterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtn: {
    borderRadius: SIZES.smp,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray_100,
    padding: SIZES.sm,
  },
  counterBtnDisabled: {
    opacity: 0.3,
  },
  countText: {
    fontFamily: FONTS.Montserrat_600,
    color: COLORS.gray_700,
    fontSize: SIZES.md,
    width: SIZES.xl,
    textAlign: 'center',
  },
});
