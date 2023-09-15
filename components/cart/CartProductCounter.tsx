import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../constants';

interface Props {
  count: number;
}

const CartProductCounter = ({ count }: Props) => {
  const handleDecrementProductCount = () => {};

  const handleIncrementProductCount = () => {};

  return (
    <View style={styles.counterWrapper}>
      <TouchableOpacity
        style={styles.counterBtn}
        activeOpacity={0.7}
        onPress={handleDecrementProductCount}
      >
        <FontAwesome5 name="minus" size={SIZES.sm} color={COLORS.gray_700} />
      </TouchableOpacity>
      <Text style={styles.countText}>{count}</Text>
      <TouchableOpacity
        style={styles.counterBtn}
        activeOpacity={0.7}
        onPress={handleIncrementProductCount}
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
  countText: {
    fontFamily: FONTS.Montserrat_600,
    color: COLORS.gray_700,
    fontSize: SIZES.md,
    width: SIZES.xl,
    textAlign: 'center',
  },
});
