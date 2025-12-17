import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { ProgressRing } from '@/src/components/ui/progress-ring';
import { BrandColors } from '@/src/constants/theme';

export default function LoadingScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/discover');
    }, 1800);

    const tick = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + 8));
    }, 220);

    return () => {
      clearTimeout(timer);
      clearInterval(tick);
    };
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} lightColor={BrandColors.primary} darkColor={BrandColors.primary}>
        <ProgressRing progress={progress} />
        <View style={styles.labelRow}>
          <ThemedText size={15} style={styles.label} lightColor="#0A0A0A" darkColor="#0A0A0A">
            Selecting topics for
          </ThemedText>
          <ThemedText
            size={15}
            style={[styles.label, styles.labelAccent]}
            lightColor={BrandColors.secondary}
            darkColor={BrandColors.secondary}>
            you...
          </ThemedText>
        </View>
        <ThemedText size={14} style={styles.helper} lightColor="#0A0A0A" darkColor="#0A0A0A">
          We are picking experiences tailored to you.
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BrandColors.primary },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 24,
  },
  labelRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    color: '#0A0A0A',
    fontWeight: '800',
  },
  labelAccent: {
    color: BrandColors.secondary,
  },
  helper: {
    textAlign: 'center',
    color: '#0A0A0A',
    fontWeight: '700',
    lineHeight: 20,
  },
});
