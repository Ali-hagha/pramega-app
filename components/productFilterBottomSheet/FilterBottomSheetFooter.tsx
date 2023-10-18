import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { Categories, Featured } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';

interface Props {
  selectedCategory: Categories;
  selectedFeatured: Featured;
}

const FilterBottomSheetFooter = ({
  selectedCategory,
  selectedFeatured,
}: Props) => {
  const { close } = useBottomSheet();

  const { category = 'all', featured = 'all' } = useLocalSearchParams<{
    category: Categories;
    featured: Featured;
  }>();

  const createHref = () => {
    if (selectedCategory !== 'all' && selectedFeatured !== 'all')
      return `/products/${selectedCategory}/filter?featured=${selectedFeatured}`;

    if (selectedCategory !== 'all' && selectedFeatured === 'all')
      return `/products/${selectedCategory}`;

    if (selectedCategory === 'all' && selectedFeatured !== 'all')
      return `/products/filter?featured=${selectedFeatured}`;

    return '/products';
  };

  const handleApplyFilters = () => {
    // navigate back to all products after pressing the back button when a filter is selected
    if (category !== 'all' || featured !== 'all') {
      router.replace(createHref());
    } else {
      router.push(createHref());
    }
    close();
  };

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        onPress={() => close()}
        style={styles.closeBtn}
        activeOpacity={0.5}
      >
        <Feather name="x" size={SIZES.xl} color={COLORS.gray_700} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleApplyFilters}
        style={styles.applyBtn}
        activeOpacity={0.5}
      >
        <Text style={styles.btnTitle}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterBottomSheetFooter;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    gap: SIZES.sm,
    marginTop: 'auto',
    padding: SIZES.md,
  },
  applyBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.xs,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  closeBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.xs,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: COLORS.gray_800,
    fontFamily: FONTS.Montserrat_700,
    fontSize: SIZES.md,
  },
});
