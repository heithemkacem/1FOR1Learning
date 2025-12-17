import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/src/components/themed-text';
import { useTheme } from '@/src/hooks/use-theme';

export function LegalNotice() {
  const { colors } = useTheme();
  return (
    <ThemedText size={14} style={[styles.legal, { color: colors.text }]} >
      By continuing, you agree to 1FOR1 <Link href="https://clerk.com/terms"> <ThemedText type="bold" style={styles.emphasis}>Terms of Use</ThemedText>{' '}</Link>{' '}
     and confirm you have
     read our
      <Link href="https://clerk.com/privacy"> <ThemedText type="bold" style={styles.emphasis}>Privacy Policy</ThemedText>{' '}</Link>.
      Learn more about how we collect data.
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  legal: {
    lineHeight: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  emphasis: {
    textDecorationLine: 'underline',
  },
});
