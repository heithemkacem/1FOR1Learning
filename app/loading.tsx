import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedScreen } from '@/src/components/themed-screen';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { ProgressRing } from '@/src/components/ui/progress-ring';
import { useTheme } from '@/src/hooks/use-theme';

export default function LoadingScreen() {
  const router = useRouter();
  const { colors } = useTheme();
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
    <ThemedScreen colorName="accentPrimary">
      <ThemedView style={styles.container} colorName="accentPrimary">
        <ProgressRing progress={progress} />
        <View style={styles.labelRow}>
          <ThemedText size={15} style={[styles.label, { color: colors.onBrand }]}
            lightColor={colors.onBrand}
            darkColor={colors.onBrand}>
            Selecting topics for
          </ThemedText>
          <ThemedText
            size={15}
            style={[styles.label, { color: colors.accentSecondary }]}
            lightColor={colors.accentSecondary}
            darkColor={colors.accentSecondary}>
            you...
          </ThemedText>
        </View>
        <ThemedText size={14} style={[styles.helper, { color: colors.onBrand }]} lightColor={colors.onBrand} darkColor={colors.onBrand}>
          We are picking experiences tailored to you.
        </ThemedText>
      </ThemedView>
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: '800',
  },
  helper: {
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 20,
  },
});
