import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BrandButton } from '@/src/components/ui/brand-button';
import { BrandInput } from '@/src/components/ui/brand-input';
import { ThemedText } from '../themed-text';

type Mode = 'email' | 'phone';

type Props = {
  mode: Mode;
  identifier: string;
  code: string;
  showVerify: boolean;
  loading: boolean;
  onModeChange: (mode: Mode) => void;
  onIdentifierChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onSubmit: () => void;
};

export function IdentifierLogin({
  mode,
  identifier,
  code,
  showVerify,
  loading,
  onModeChange,
  onIdentifierChange,
  onCodeChange,
  onSubmit,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.toggleRow}>
        <Pressable style={[styles.toggle, mode === 'email' ? styles.toggleActive : null]} onPress={() => onModeChange('email')}>
          <View style={styles.toggleContent}>
            <View style={[styles.radioOuter, mode === 'email' ? styles.radioOuterActive : null]}>{mode === 'email' ? <View style={styles.radioInner} /> : null}</View>
            <ThemedText size={13} style={[styles.toggleLabel, mode === 'email' ? styles.toggleLabelActive : null]}>Email address</ThemedText>
          </View>
        </Pressable>
        <Pressable style={[styles.toggle, mode === 'phone' ? styles.toggleActive : null]} onPress={() => onModeChange('phone')}>
          <View style={styles.toggleContent}>
            <View style={[styles.radioOuter, mode === 'phone' ? styles.radioOuterActive : null]}>{mode === 'phone' ? <View style={styles.radioInner} /> : null}</View>
            <ThemedText size={13} style={[styles.toggleLabel, mode === 'phone' ? styles.toggleLabelActive : null]}>Phone</ThemedText>
          </View>
        </Pressable>
      </View>

      <View style={styles.form}>
        <BrandInput
          keyboardType={mode === 'phone' ? 'phone-pad' : 'email-address'}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={mode === 'email' ? 'Email address' : 'Phone number'}
          value={identifier}
          onChangeText={onIdentifierChange}
          returnKeyType="done"
        />

        {showVerify ? (
          <BrandInput
            autoCapitalize="none"
            keyboardType="number-pad"
            placeholder="Verification code"
            value={code}
            onChangeText={onCodeChange}
            returnKeyType="done"
          />
        ) : null}

        <BrandButton
          label={showVerify ? 'Confirm code' : 'Continue'}
          onPress={onSubmit}
          loading={loading}
          backgroundGradientColors={["#FFFF53"]}
          borderGradientColors={["#b9f747ff", "#B8FF35"]}
          backgroundGradientStart={{ x: 0, y: 0.5 }}
          backgroundGradientEnd={{ x: 1, y: 0.5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 8,
  },
  toggle: {
    flex: 1,
    paddingTop: 12,
    alignItems: 'flex-start',
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  toggleActive: {
    backgroundColor: 'transparent',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0B0C',
  },
  radioOuterActive: {
    borderColor: '#44DBE5',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#44DBE5',
  },
  toggleLabel: {
    color: '#A4A5AE',
    fontWeight: '700',
  },
  toggleLabelActive: {
    color: '#FFFFFF',
  },
  form: {
    gap: 14,
  },
});
