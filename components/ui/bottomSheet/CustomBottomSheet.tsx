import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

interface Props {
  children: React.ReactNode;
}

const CustomBottomSheet = ({ children }: Props) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      router.back();
    }
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
      >
        {children}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomBottomSheet;
