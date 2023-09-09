import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constans';
import ProductFilterBtn from '../ui/ProductFilterBtn';

const FilterBottomSheetContent = () => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.header}>Categories</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <ProductFilterBtn title="Chairs" active={false} />
        <ProductFilterBtn title="Chairs" active={true} />
      </View>
    </View>
  );
};

export default FilterBottomSheetContent;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: SIZES.md,
  },
  header: {
    fontFamily: FONTS.Montserrat_700,
    fontSize: SIZES.lg,
    color: COLORS.gray_700,
    marginBottom: SIZES.xs,
  },
});
