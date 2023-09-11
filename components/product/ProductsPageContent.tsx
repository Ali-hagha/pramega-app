import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';
import FilterBottomSheetBtn from '../ui/FilterBottomSheetBtn';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FlatList } from 'react-native-gesture-handler';
import ProductCardSmall from './ProductCardSmall';
import ProductCardSkeletonSmall from '../skeleton/ProductCardSkeletonSmall';
import { MetaData, Product } from '../../types/types';
import NoProductsFound from './NoProductsFound';

interface Props {
  queryKey: string[];
  queryFunction: ({
    pageParam,
    queryKey,
  }: {
    pageParam?: number | undefined;
    queryKey: string[];
  }) => Promise<{
    products: Product[];
    metaData: MetaData;
  }>;
}

const ProductsPageContent = ({ queryKey, queryFunction }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: queryFunction,
    getNextPageParam: (lastPage, pages) => {
      const pagination = lastPage.metaData.pagination;
      if (pagination.page < pagination.pageCount) {
        return pagination.page + 1;
      }
      return undefined;
    },
  });

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Products</Text>
        <FilterBottomSheetBtn />
      </View>
      {isSuccess && (
        <FlatList
          data={data.pages.map(page => page.products).flat() ?? []}
          renderItem={({ item }) => <ProductCardSmall product={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.scrollContentContainer}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          overScrollMode="never"
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={<NoProductsFound />}
          ListFooterComponent={
            hasNextPage ? (
              <ActivityIndicator
                size="large"
                color={COLORS.gray_500}
                style={styles.spinner}
              />
            ) : null
          }
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
            justifyContent: 'space-between',
          }}
          overScrollMode="never"
        />
      )}
    </SafeAreaView>
  );
};

export default ProductsPageContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  scrollContentContainer: {
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xxxs,
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
  spinner: {
    paddingVertical: SIZES.md,
  },
});
