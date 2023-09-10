import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../../constants';
import { router } from 'expo-router';

interface Props {
  children: ReactNode;
  onPress: () => void;
}

const IconBtn = ({ children, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.6}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
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
