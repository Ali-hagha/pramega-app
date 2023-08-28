import { TextInput, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constans';
import { useState } from 'react';

function SearchBar() {
  const [searchInputValue, setsearchInputValue] = useState('');

  const handleSearchSubmit = () => {
    console.log('submit search', searchInputValue);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchInputValue}
        onChangeText={text => setsearchInputValue(text)}
        returnKeyType="search"
        onSubmitEditing={handleSearchSubmit}
      />
      <TouchableOpacity
        style={styles.searchBtn}
        activeOpacity={0.7}
        onPress={handleSearchSubmit}
      >
        <Feather name="search" size={SIZES.lg} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: SIZES.md,
    flexDirection: 'row',
  },
  searchInput: {
    backgroundColor: COLORS.gray_100,
    padding: SIZES.xs,
    borderRadius: SIZES.xs,
    fontSize: SIZES.md,
    color: COLORS.gray_700,
    flex: 1,
  },
  searchBtn: {
    padding: SIZES.xs,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray_700,
    marginStart: SIZES.xs,
    borderRadius: SIZES.xs,
    color: 'white',
    flex: 1,
    width: 48,
  },
});

export default SearchBar;
