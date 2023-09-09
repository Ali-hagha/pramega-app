import { StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { COLORS, FONTS, SIZES } from '../../constans';

interface Props {
  title: string;
  active: boolean;
}

const ProductFilterBtn = ({ title, active }: Props) => {
  return (
    <Pressable style={[styles.btn, active && styles.btnActive]}>
      <Text style={[styles.btnTitle, active && styles.btnTitleActive]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default ProductFilterBtn;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.xs,
    backgroundColor: COLORS.gray_100,
    flexBasis: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    backgroundColor: COLORS.gray_700,
  },
  btnTitle: {
    color: COLORS.gray_600,
    fontFamily: FONTS.Montserrat_600,
    fontSize: SIZES.md,
  },
  btnTitleActive: {
    color: COLORS.white,
  },
});
