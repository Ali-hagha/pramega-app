import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link, useLocalSearchParams } from 'expo-router';
import { Categories, Featured } from '../../types/types';

const FilterBottomSheetBtn = () => {
  const { category, featured } = useLocalSearchParams<{
    category: Categories;
    featured: Featured;
  }>();

  return (
    <Link
      href={{
        pathname: '/filterBottomSheet',
        params: {
          category: category || 'all',
          featured: featured || 'all',
        },
      }}
      asChild
    >
      <TouchableOpacity style={styles.btn} activeOpacity={0.6}>
        <Feather name="filter" size={SIZES.xl} color={COLORS.gray_700} />
      </TouchableOpacity>
    </Link>
  );
};

export default FilterBottomSheetBtn;

const styles = StyleSheet.create({
  btn: {
    padding: SIZES.xs,
    borderRadius: SIZES.xs,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
