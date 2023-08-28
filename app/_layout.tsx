import { Slot, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import {
  useFonts,
  Montserrat_100Thin as Montserrat_100,
  Montserrat_200ExtraLight as Montserrat_200,
  Montserrat_300Light as Montserrat_300,
  Montserrat_400Regular as Montserrat_400,
  Montserrat_500Medium as Montserrat_500,
  Montserrat_600SemiBold as Montserrat_600,
  Montserrat_700Bold as Montserrat_700,
  Montserrat_800ExtraBold as Montserrat_800,
  Montserrat_900Black as Montserrat_900,
} from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_100,
    Montserrat_200,
    Montserrat_300,
    Montserrat_400,
    Montserrat_500,
    Montserrat_600,
    Montserrat_700,
    Montserrat_800,
    Montserrat_900,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <Slot />
      </View>
    </QueryClientProvider>
  );
};

export default RootLayout;
