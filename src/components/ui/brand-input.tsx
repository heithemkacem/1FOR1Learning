import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { BrandColors } from '@/src/constants/theme';
import { ThemedText } from '../themed-text';

type Props = TextInputProps & {
  label?: string;
};

export function BrandInput({ label, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      {label ? <ThemedText size={13} style={styles.label}>{label}</ThemedText> : null}
      <TextInput
        placeholderTextColor={BrandColors.mutedText}
        style={[styles.input]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 6,
  },
  label: {
    color: BrandColors.text,
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#1A1A1D',
    color: BrandColors.text,
    letterSpacing: 0.2,
  },
});
