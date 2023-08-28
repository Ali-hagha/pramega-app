import { StyleSheet, ScrollView, Text } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constans';
import SearchBar from '../../components/SearchBar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen />
      <ScrollView>
        <Text style={styles.header}>Elevate Your Space</Text>
        <SearchBar />
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
    fontFamily: FONTS.Montserrat_700,
    fontSize: SIZES.xl,
    color: COLORS.gray_700,
  },
});
