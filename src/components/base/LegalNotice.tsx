import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useI18n } from '@/src/hooks/use-i18n';
import { useTheme } from '@/src/hooks/use-theme';
import { ThemedText } from '../global';

export function LegalNotice() {
  const { colors } = useTheme();
  const { t } = useI18n();
  return (
    <ThemedText size={14} style={[styles.legal, { color: colors.text }]} >
      {t('login.legalNotice')} <Link href="https://clerk.com/terms"> <ThemedText type="bold" style={styles.emphasis}>{t('login.termsOfUse')}</ThemedText>{' '}</Link>{' '}
     {t('login.andConfirm')}
      <Link href="https://clerk.com/privacy"> <ThemedText type="bold" style={styles.emphasis}>{t('login.privacyPolicy')}</ThemedText>{' '}</Link>.
      {t('login.learnMore')}
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
