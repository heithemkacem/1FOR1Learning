import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { BrandColors } from '@/src/constants/theme';

export default function OAuthCallback() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    // Once Clerk finishes processing the OAuth callback, redirect appropriately
    if (isSignedIn) {
      router.replace('/loading');
    } else {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={BrandColors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.dark,
  },
});
