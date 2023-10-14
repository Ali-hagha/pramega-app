import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartContextData } from '@/hooks/useCartContextData';
import { useQuery } from '@tanstack/react-query';

import { COLORS, FONTS, SIZES } from '@/constants';

import getCartById from '@/api/getCartById';
import getFavoriteProducts from '@/api/getFavoriteProducts';
import getNewProducts from '@/api/getNewProducts';
import getOnSaleProducts from '@/api/getOnSaleProducts';
import ProductsHorizontalList from '@/components/product/ProductsHorizontalList';
import SearchBar from '@/components/ui/SearchBar';

export default function HomePage() {
  const { cartId } = useCartContextData();

  const cartDataQuery = useQuery({
    queryKey: ['cartById', cartId],
    queryFn: () => getCartById(cartId),
    enabled: !!cartId,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Elevate Your Space</Text>
        <SearchBar />
        <ProductsHorizontalList
          title="New Arrivals"
          getProducts={getNewProducts}
          queryKey="newProducts"
        />
        <ProductsHorizontalList
          title="All Time Favorites"
          getProducts={getFavoriteProducts}
          queryKey="favoriteProducts"
        />
        <ProductsHorizontalList
          title="On Sale"
          getProducts={getOnSaleProducts}
          queryKey="onSaleProducts"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.md,
    fontFamily: FONTS.Montserrat_800,
    fontSize: SIZES.xl,
    color: COLORS.gray_700,
  },
});
