import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

interface Props {
  children: React.ReactNode;
  footerComponent?: React.ReactNode;
}

const CustomBottomSheet = ({ children, footerComponent }: Props) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['80%', '95%'], []);

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

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props}>{footerComponent}</BottomSheetFooter>
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
        footerComponent={renderFooter}
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
