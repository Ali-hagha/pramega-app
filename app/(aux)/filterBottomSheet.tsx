import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import FilterBottomSheetFooter from '@/components/productFilterBottomSheet/FilterBottomSheetFooter';
import { Categories, Featured } from '@/types/types';
import FilterBottomSheetContent from '../../components/productFilterBottomSheet/FilterBottomSheetContent';
import CustomBottomSheet from '../../components/ui/bottomSheet/CustomBottomSheet';

const filterBottomSheet = () => {
  const { category = 'all', featured = 'all' } = useLocalSearchParams<{
    category: Categories;
    featured: Featured;
  }>();

  const selectedCategoryState = useState<Categories>(category);
  const selectedFeaturedState = useState<Featured>(featured);
  const [selectedCategory] = selectedCategoryState;
  const [selectedFeatured] = selectedFeaturedState;

  return (
    <CustomBottomSheet
      footerComponent={
        <FilterBottomSheetFooter
          selectedCategory={selectedCategory}
          selectedFeatured={selectedFeatured}
        />
      }
    >
      <FilterBottomSheetContent
        selectedCategoryState={selectedCategoryState}
        selectedFeaturedState={selectedFeaturedState}
      />
    </CustomBottomSheet>
  );
};

export default filterBottomSheet;
