import { StyleSheet, ScrollView, Text } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constants';
import SearchBar from '../../components/ui/SearchBar';
import ProductsHorizontalList from '../../components/product/ProductsHorizontalList';
import getNewProducts from '../../api/getNewProducts';
import getFavoriteProducts from '../../api/getFavoriteProducts';
import getOnSaleProducts from '../../api/getOnSaleProducts';

export default function HomePage() {
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
