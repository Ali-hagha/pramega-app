import { StyleSheet, ScrollView, Text } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constans';
import SearchBar from '../../components/SearchBar';
import ProductsSlider from '../../components/ProductsSlider';
import getNewProducts from '../../api/getNewProducts';
import getFavoriteProducts from '../../api/getFavoriteProducts';
import getOnSaleProducts from '../../api/getOnSaleProducts';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen />
      <ScrollView>
        <Text style={styles.header}>Elevate Your Space</Text>
        <SearchBar />
        <ProductsSlider
          title="New Arrivals"
          getProducts={getNewProducts}
          queryKey="newProducts"
        />
        <ProductsSlider
          title="All Time Favorites"
          getProducts={getFavoriteProducts}
          queryKey="favoriteProducts"
        />
        <ProductsSlider
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
