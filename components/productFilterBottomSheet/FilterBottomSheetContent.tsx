import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';
import SelectProductCategoryBtn from './SelectProductCategoryBtn';
import { Categories, Featured } from '../../types/types';
import SelectProductFeaturedBtn from './SelectProductFeaturedBtn';
import { Feather } from '@expo/vector-icons';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from 'expo-router';

const FilterBottomSheetContent = () => {
  const { category = 'all', featured = 'all' } = useLocalSearchParams<{
    category: Categories;
    featured: Featured;
  }>();

  const selectedCategoryState = useState<Categories>(category);
  const selectedFeaturedState = useState<Featured>(featured);
  const [selectedCategory] = selectedCategoryState;
  const [selectedFeatured] = selectedFeaturedState;

  const { close } = useBottomSheet();

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
    router.push(createHref());

    close();
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.filterWrapper}>
          <Text style={styles.header}>Categories</Text>
          <View style={styles.filterItems}>
            <SelectProductCategoryBtn
              title="All"
              category="all"
              categoryState={selectedCategoryState}
            />
            <SelectProductCategoryBtn
              title="Chairs"
              category="chairs"
              categoryState={selectedCategoryState}
            />
            <SelectProductCategoryBtn
              title="Storage"
              category="storage"
              categoryState={selectedCategoryState}
            />
            <SelectProductCategoryBtn
              title="Beds"
              category="beds"
              categoryState={selectedCategoryState}
            />
            <SelectProductCategoryBtn
              title="Sofas"
              category="sofas"
              categoryState={selectedCategoryState}
            />
            <SelectProductCategoryBtn
              title="Tables"
              category="tables"
              categoryState={selectedCategoryState}
            />
          </View>
        </View>
        <View style={styles.filterWrapper}>
          <Text style={styles.header}>Featured</Text>
          <View style={styles.filterItems}>
            <SelectProductFeaturedBtn
              title="All"
              featured="all"
              featuredState={selectedFeaturedState}
            />
            <SelectProductFeaturedBtn
              title="On sale"
              featured="sale"
              featuredState={selectedFeaturedState}
            />
            <SelectProductFeaturedBtn
              title="New arrivals"
              featured="new"
              featuredState={selectedFeaturedState}
            />
          </View>
        </View>
      </View>
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
    </View>
  );
};

export default FilterBottomSheetContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.md,
  },
  filterWrapper: {
    marginBottom: SIZES.lg,
  },
  filterItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SIZES.sm,
  },
  header: {
    fontFamily: FONTS.Montserrat_700,
    fontSize: SIZES.lg,
    color: COLORS.gray_700,
    marginBottom: SIZES.xs,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: SIZES.sm,
    marginTop: 'auto',
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
