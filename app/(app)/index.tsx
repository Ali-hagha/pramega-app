import { StyleSheet, ScrollView, Text } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constans';
import SearchBar from '../../components/SearchBar';
import ProductsSlider from '../../components/ProductsSlider';
import { useQuery } from '@tanstack/react-query';
import getNewProducts from '../../api/getNewProducts';

export default function App() {
  const { data } = useQuery({
    queryKey: ['newProducts'],
    queryFn: getNewProducts,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen />
      <ScrollView>
        <Text style={styles.header}>Elevate Your Space</Text>
        <SearchBar />
        {data ? (
          <ProductsSlider title="New Arrivals" products={data} />
        ) : (
          <Text>Loading</Text>
        )}
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
