import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { router } from 'expo-router';

const BackBtn = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.6}
        onPress={router.back}
      >
        <FontAwesome5
          name="chevron-left"
          size={SIZES.lg}
          color={COLORS.gray_500}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 32,
    left: 0,
    right: 0,
    zIndex: 20,
  },
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

    borderWidth: 3,
    borderColor: COLORS.gray_200,
  },
});
