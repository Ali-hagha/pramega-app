import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constans';
import { router } from 'expo-router';

const BackBtn = () => {
  return (
    <TouchableOpacity
      style={styles.btn}
      activeOpacity={0.7}
      onPress={router.back}
    >
      <FontAwesome5
        name="chevron-left"
        size={SIZES.lg}
        color={COLORS.gray_700}
      />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  btn: {
    padding: SIZES.xs,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray_100,
    borderRadius: SIZES.xs,
    color: 'white',
    height: 48,
    width: 48,
    marginStart: SIZES.md,
    marginVertical: SIZES.xxs,
  },
});
