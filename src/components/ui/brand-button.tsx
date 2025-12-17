import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { BrandColors } from '@/src/constants/theme';
import { ThemedText } from '../themed-text';

export type BrandButtonVariant =
  | 'primary'
  | 'outline'
  | 'ghost'
  | 'facebook'
  | 'google';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: BrandButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  borderGradientColors?: string[];
  borderGradientStart?: { x: number; y: number };
  borderGradientEnd?: { x: number; y: number };
  backgroundGradientColors?: string[];
  backgroundGradientStart?: { x: number; y: number };
  backgroundGradientEnd?: { x: number; y: number };
  backgroundColorOverride?: string;
};

export function BrandButton({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  leftIcon,
  borderGradientColors,
  borderGradientStart = { x: 0, y: 0.5 },
  borderGradientEnd = { x: 1, y: 0.5 },
  backgroundGradientColors,
  backgroundGradientStart = { x: 0, y: 0 },
  backgroundGradientEnd = { x: 1, y: 0 },
  backgroundColorOverride,
}: Props) {
  const palette = getVariant(variant);
  const isDisabled = disabled || loading;
  const borderColors = borderGradientColors ?? [palette.border, palette.border];
  const backgroundColors = backgroundGradientColors ?? [backgroundColorOverride ?? palette.background];
  const hasBackgroundGradient = backgroundColors.length > 1;
  const hasBorderGradient = borderColors.length > 1 || borderGradientColors !== undefined;
  const BorderWrapper = hasBorderGradient ? LinearGradient : View;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
      ]}>
      <BorderWrapper
        {...(hasBorderGradient
          ? { colors: borderColors, start: borderGradientStart, end: borderGradientEnd }
          : {})}
        style={[styles.borderWrapper, !hasBorderGradient ? { backgroundColor: palette.border } : null]}>
        {hasBackgroundGradient ? (
          <LinearGradient
            colors={backgroundColors}
            start={backgroundGradientStart}
            end={backgroundGradientEnd}
            style={styles.innerLayer}>
            <View style={styles.content}>
              {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
              <ThemedText size={15} style={[styles.label, { color: palette.label }]}>{label}</ThemedText>
              {loading ? <ActivityIndicator size="small" color={palette.label} style={styles.spinner} /> : <View style={styles.spinner} />}
            </View>
          </LinearGradient>
        ) : (
          <View style={[styles.innerLayer, { backgroundColor: backgroundColors[0] }]}>
            <View style={styles.content}>
              {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
              <ThemedText size={15} style={[styles.label, { color: palette.label }]}>{label}</ThemedText>
              {loading ? <ActivityIndicator size="small" color={palette.label} style={styles.spinner} /> : <View style={styles.spinner} />}
            </View>
          </View>
        )}
      </BorderWrapper>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 16,
    width: '100%',
  },
  borderWrapper: {
    flex: 1,
    borderRadius: 16,
    paddingTop: 1,
    paddingLeft: 2,
    paddingBottom: 6,
    overflow: 'hidden',
  },
  innerLayer: {
    flex: 1,
    borderRadius: 14,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    paddingLeft: 36,
    position: 'relative',
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    left: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 22,
    alignItems: 'center',
  },
  pressed: {
    transform: [{ translateY: 1 }],
  },
  disabled: {
    opacity: 0.6,
  },
});

function getVariant(variant: BrandButtonVariant) {
  switch (variant) {
    case 'outline':
      return { background: 'transparent', border: BrandColors.secondary, label: BrandColors.secondary };
    case 'ghost':
      return { background: 'transparent', border: 'transparent', label: BrandColors.text };
    case 'facebook':
      return { background: '#0D8BF1', border: '#0D8BF1', label: '#FFFFFF' };
    case 'google':
      return { background: '#00C8FF', border: '#00C8FF', label: '#FFFFFF' };
    default:
      return { background: BrandColors.primary, border: BrandColors.primary, label: '#0A0A0A' };
  }
}
