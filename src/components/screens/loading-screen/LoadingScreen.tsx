import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedScreen } from '@/src/components/themed-screen';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { ProgressRing } from '@/src/components/ui/progress-ring';
import { useI18n } from '@/src/hooks/use-i18n';
import { useTheme } from '@/src/hooks/use-theme';

export default function LoadingScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useI18n();
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/discover');
    }, 2450);

    const tick = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + 8));
    }, 145);

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
          <ThemedText
            size={16}
            type='bold'
            style={[styles.label, { color: colors.onBrand }]}
            lightColor={colors.onBrand}
            darkColor={colors.onBrand}
          >
            {t('loading.selectingTopics')} 
          </ThemedText>
          <ThemedText
            size={16}
            type='bold'
            style={[styles.label, { color: colors.purple }]}
          >
            {t('loading.forYou')}
          </ThemedText>
        </View>
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
  },
  helper: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
