import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES } from '../../constants';

interface Props {
  productCount: number;
}

const EditProductInCartForm = ({ productCount }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.counterWrapper}>
        {productCount > 1 ? (
          <TouchableOpacity style={styles.counterBtn} activeOpacity={0.7}>
            <FontAwesome5
              name="minus"
              size={SIZES.md}
              color={COLORS.gray_700}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7}>
            <FontAwesome5
              name="trash-alt"
              size={SIZES.xl}
              color={COLORS.gray_700}
            />
          </TouchableOpacity>
        )}
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Items in cart:</Text>
          <Text style={[styles.countText, styles.text]}>{productCount}</Text>
        </View>
        <TouchableOpacity style={styles.counterBtn} activeOpacity={0.7}>
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
