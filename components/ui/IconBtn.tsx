import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../../constants';
import Badge from './Badge';

interface Props {
  children: ReactNode;
  onPress: () => void;
  badgeCount?: number;
}

const IconBtn = ({ children, onPress, badgeCount }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.6}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
      <Badge count={badgeCount} top={-10} right={-10} />
    </View>
  );
};

export default IconBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
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
    borderWidth: 3,
    borderColor: COLORS.gray_200,
  },
});
