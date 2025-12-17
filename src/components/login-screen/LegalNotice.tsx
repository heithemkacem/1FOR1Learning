import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/src/components/themed-text';

export function LegalNotice() {
  return (
    <ThemedText size={12} style={styles.legal} lightColor="#8C8D95" darkColor="#8C8D95">
      By continuing, you agree to 1FOR1 <Link href="https://clerk.com/terms">Terms of Use</Link> and confirm you have
      read our <Link href="https://clerk.com/privacy">Privacy Policy</Link>.
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  legal: {
    color: '#8C8D95',
    lineHeight: 18,
    marginTop: 16,
  },
});
