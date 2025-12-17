import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { useTheme } from '@/src/hooks/use-theme';
import { ThemedText } from '../themed-text';

type Props = TextInputProps & {
  label?: string;
};

export function BrandInput({ label, ...rest }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.wrapper}>
      {label ? <ThemedText size={13} style={[styles.label, { color: colors.mutedText }]}>{label}</ThemedText> : null}
      <TextInput
        placeholderTextColor={colors.mutedText}
        style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text ,fontFamily: 'InterMedium',fontSize:16}]}
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
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 2,
    letterSpacing: 0.2,
  },
});
