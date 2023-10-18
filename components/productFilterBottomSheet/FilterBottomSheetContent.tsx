import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';
import SelectProductCategoryBtn from './SelectProductCategoryBtn';
import { Categories, Featured } from '../../types/types';
import SelectProductFeaturedBtn from './SelectProductFeaturedBtn';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from 'expo-router';

interface Props {
  selectedCategoryState: [
    Categories,
    React.Dispatch<React.SetStateAction<Categories>>
  ];
  selectedFeaturedState: [
    Featured,
    React.Dispatch<React.SetStateAction<Featured>>
  ];
}

const FilterBottomSheetContent = ({
  selectedCategoryState,
  selectedFeaturedState,
}: Props) => {
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
});
