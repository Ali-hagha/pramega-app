import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constans';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import getAllProducts from '../../../api/getAllProducts';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ProductCardSmall from '../../../components/product/ProductCardSmall';
import ProductCardSkeletonSmall from '../../../components/skeleton/ProductCardSkeletonSmall';
import FilterModalBtn from '../../../components/ui/FilterModalBtn';

const Products = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['allProducts'],
    queryFn: getAllProducts,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Products</Text>
        <FilterModalBtn />
      </View>
      {isSuccess && (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCardSmall product={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.scrollContentContainer}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-around',
          }}
          overScrollMode="never"
        />
      )}
      {/* show skeleton if not loaded */}
      {isLoading && (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({ item }) => <ProductCardSkeletonSmall />}
          keyExtractor={item => item.toString()}
          contentContainerStyle={styles.scrollContentContainer}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-around',
          }}
          overScrollMode="never"
        />
      )}
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  scrollContentContainer: {
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xxxxs,
    gap: SIZES.xxs,
  },
  headerWrapper: {
    padding: SIZES.xxs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontFamily: FONTS.Montserrat_700,
    fontSize: SIZES.xl,
    color: COLORS.gray_700,
  },
});
