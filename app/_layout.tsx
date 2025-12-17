import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useMemo } from 'react';
import 'react-native-reanimated';

import { SnackBarProvider } from '@/src/components/ui/snackbar';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { AppThemeProvider } from '@/src/hooks/use-theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = useMemo(() => new QueryClient(), []);
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';

  useEffect(() => {
    if (!publishableKey) {
      console.warn('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY for Clerk.');
    }
  }, [publishableKey]);

  const [fontsLoaded] = useFonts({
    InterThin: require('../src/assets/fonts/Inter_24pt-Thin.ttf'),
    InterThinItalic: require('../src/assets/fonts/Inter_24pt-ThinItalic.ttf'),
    InterExtraLight: require('../src/assets/fonts/Inter_24pt-ExtraLight.ttf'),
    InterExtraLightItalic: require('../src/assets/fonts/Inter_24pt-ExtraLightItalic.ttf'),
    InterLight: require('../src/assets/fonts/Inter_24pt-Light.ttf'),
    InterLightItalic: require('../src/assets/fonts/Inter_24pt-LightItalic.ttf'),
    InterRegular: require('../src/assets/fonts/Inter_24pt-Regular.ttf'),
    InterItalic: require('../src/assets/fonts/Inter_24pt-Italic.ttf'),
    InterMedium: require('../src/assets/fonts/Inter_24pt-Medium.ttf'),
    InterMediumItalic: require('../src/assets/fonts/Inter_24pt-MediumItalic.ttf'),
    InterSemiBold: require('../src/assets/fonts/Inter_24pt-SemiBold.ttf'),
    InterSemiBoldItalic: require('../src/assets/fonts/Inter_24pt-SemiBoldItalic.ttf'),
    InterBold: require('../src/assets/fonts/Inter_24pt-Bold.ttf'),
    InterBoldItalic: require('../src/assets/fonts/Inter_24pt-BoldItalic.ttf'),
    InterExtraBold: require('../src/assets/fonts/Inter_24pt-ExtraBold.ttf'),
    InterExtraBoldItalic: require('../src/assets/fonts/Inter_24pt-ExtraBoldItalic.ttf'),
    InterBlack: require('../src/assets/fonts/Inter_24pt-Black.ttf'),
    InterBlackItalic: require('../src/assets/fonts/Inter_24pt-BlackItalic.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const tokenCache = {
    async getToken(key: string) {
      return SecureStore.getItemAsync(key);
    },
    async saveToken(key: string, value: string) {
      return SecureStore.setItemAsync(key, value);
    },
  };

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ClerkLoaded>
              <SnackBarProvider>
                <Stack
                  initialRouteName="index"
                  screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    animationDuration: 300,
                  }}
                >
                  <Stack.Screen name="index" options={{ animation: 'fade' }} />
                  <Stack.Screen name="login" options={{ animation: 'simple_push' }} />
                  <Stack.Screen name="loading" options={{ animation: 'fade' }} />
                  <Stack.Screen name="discover" options={{ animation: 'slide_from_left' }} />
                </Stack>
              </SnackBarProvider>
            </ClerkLoaded>
          </NavigationThemeProvider>
        </AppThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
