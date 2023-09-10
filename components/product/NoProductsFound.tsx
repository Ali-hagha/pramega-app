import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';
import { Link, router, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NoProductsFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>No products found.</Text>
      <Link href={'/products'} asChild>
        <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
          <Text style={styles.btnTitle}>View all products.</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default NoProductsFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SIZES.xxxl,
  },
  header: {
    fontFamily: FONTS.Montserrat_700,
    color: COLORS.gray_600,
    fontSize: SIZES.lg,
    marginBottom: SIZES.md,
  },
  btn: {
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.sm,
    backgroundColor: COLORS.gray_100,
    borderRadius: SIZES.sm,
  },
  btnTitle: {
    fontFamily: FONTS.Montserrat_500,
    color: COLORS.gray_600,
    fontSize: SIZES.md,
  },
});
