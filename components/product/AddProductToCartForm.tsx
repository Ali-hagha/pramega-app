import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const AddProductToCartForm = () => {
  const [productCount, setProductCount] = useState(1);

  const handleIncrement = () => {
    setProductCount(prevCount => {
      if (prevCount < 6) return prevCount + 1;
      return prevCount;
    });
  };

  const handleDecrement = () => {
    setProductCount(prevCount => {
      if (prevCount <= 1) return prevCount;
      return prevCount - 1;
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={() => console.log('add to cart')}
        >
          <Text style={styles.btnText}>Add to cart</Text>
          <Feather name="shopping-cart" size={SIZES.lg} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.counterWrapper}>
        <TouchableOpacity
          style={styles.counterBtn}
          activeOpacity={0.7}
          onPress={handleDecrement}
        >
          <FontAwesome5 name="minus" size={SIZES.sm} color={COLORS.gray_700} />
        </TouchableOpacity>
        <Text style={styles.countText}>{productCount}</Text>
        <TouchableOpacity
          style={styles.counterBtn}
          activeOpacity={0.7}
          onPress={handleIncrement}
        >
          <FontAwesome5 name="plus" size={SIZES.sm} color={COLORS.gray_700} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddProductToCartForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    padding: SIZES.md,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    borderRadius: SIZES.md,
    backgroundColor: COLORS.gray_700,
    flexDirection: 'row',
    padding: SIZES.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.Montserrat_600,
    fontSize: SIZES.md,
    marginEnd: SIZES.xxs,
  },
  counterWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray_100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xxs,
    marginEnd: SIZES.md,
    borderRadius: SIZES.md,
  },
  counterBtn: {
    borderRadius: SIZES.smp,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.sm,
  },
  countText: {
    fontFamily: FONTS.Montserrat_600,
    color: COLORS.gray_700,
    fontSize: SIZES.md,
    width: SIZES.xl,
    textAlign: 'center',
  },
});
