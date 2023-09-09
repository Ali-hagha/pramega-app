import React from 'react';
import FilterBottomSheetContent from '../../components/product/FilterBottomSheetContent';
import CustomBottomSheet from '../../components/ui/bottomSheet/CustomBottomSheet';

const filterBottomSheet = () => {
  return (
    <CustomBottomSheet>
      <FilterBottomSheetContent />
    </CustomBottomSheet>
  );
};

export default filterBottomSheet;
