import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';

interface Props {
  onPress: () => void;
  isActive: boolean;
  title: string;
}

const FilterBtn = ({ onPress, isActive, title }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, isActive && styles.btnActive]}
      activeOpacity={0.7}
    >
      <Text style={[styles.btnTitle, isActive && styles.btnTitleActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterBtn;

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
