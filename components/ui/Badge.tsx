import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';

interface Props {
  count: number | undefined;
  top?: number;
  right?: number;
}

const Badge = ({ count, top, right }: Props) => {
  const positionStyle: StyleProp<ViewStyle> = {
    top: top ? top : 0,
    right: right ? right : 0,
  };

  if (!count || count === 0) {
    return null;
  }

  return (
    <View style={[styles.badge, positionStyle]}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    width: SIZES.xl,
    height: SIZES.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.gray_200,
    right: 0,
  },
  badgeText: {
    fontFamily: FONTS.Montserrat_500,
    color: COLORS.gray_700,
    fontSize: SIZES.sm,
  },
});
