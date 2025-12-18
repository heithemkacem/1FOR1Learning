import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, ColorValue, Pressable, StyleSheet, View } from 'react-native';

type GradientColors = readonly [ColorValue, ColorValue, ...ColorValue[]];

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
  labelGradientColors?: string[];
  labelGradientStart?: { x: number; y: number };
  labelGradientEnd?: { x: number; y: number };
  centerContent?: boolean;
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
  labelGradientColors,
  labelGradientStart = { x: 0, y: 0.5 },
  labelGradientEnd = { x: 1, y: 0.5 },
  centerContent = false,
}: Props) {
  const palette = getVariant(variant);
  const isDisabled = disabled || loading;
  const borderColors = ensureTwoStops(borderGradientColors) ?? [palette.border, palette.border] as GradientColors;
  const backgroundColors = ensureTwoStops(backgroundGradientColors) ?? [backgroundColorOverride ?? palette.background, backgroundColorOverride ?? palette.background] as GradientColors;
  const labelColors = ensureTwoStops(labelGradientColors);
  const hasBackgroundGradient = backgroundGradientColors && backgroundGradientColors.length > 1;
  const hasBorderGradient = borderGradientColors && borderGradientColors.length > 1;
  const hasLabelGradient = labelColors !== undefined && labelColors.length > 1;

  const renderLabel = () => {
    if (!hasLabelGradient) {
      return (
        <ThemedText size={16} type='medium' style={[styles.label, { color: palette.label }]}>
          {label}
        </ThemedText>
      );
    }

    return (
      <MaskedView
        maskElement={
          <ThemedText size={16} type='medium' style={[styles.label, styles.maskLabel]}>
            {label}
          </ThemedText>
        }>
        <LinearGradient colors={labelColors!} start={labelGradientStart} end={labelGradientEnd}>
          <ThemedText size={16} type='medium' style={[styles.label, styles.hiddenLabel]}>
            {label}
          </ThemedText>
        </LinearGradient>
      </MaskedView>
    );
  };

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
      {hasBorderGradient ? (
      <LinearGradient
        colors={borderColors}
        start={borderGradientStart}
        end={borderGradientEnd}
        style={styles.borderWrapper}>
        {hasBackgroundGradient ? (
          <LinearGradient
            colors={backgroundColors}
            start={backgroundGradientStart}
            end={backgroundGradientEnd}
            style={styles.innerLayer}>
            <View style={[styles.content, centerContent ? styles.contentCentered : null]}>
              {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
              {renderLabel()}
              {loading ? <ActivityIndicator size="small" color={palette.label} style={styles.spinner} /> : <View style={styles.spinner} />}
            </View>
          </LinearGradient>
        ) : (
          <View style={[styles.innerLayer, { backgroundColor: backgroundColors[0] }]}>
            <View style={[styles.content, centerContent ? styles.contentCentered : null]}>
              {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
              {renderLabel()}
              {loading ? <ActivityIndicator size="small" color={palette.label} style={styles.spinner} /> : <View style={styles.spinner} />}
            </View>
          </View>
        )}
      </LinearGradient>
      ) : (
      <View style={[styles.borderWrapper, { backgroundColor: palette.border }]}>
        {hasBackgroundGradient ? (
          <LinearGradient
            colors={backgroundColors}
            start={backgroundGradientStart}
            end={backgroundGradientEnd}
            style={styles.innerLayer}>
            <View style={[styles.content, centerContent ? styles.contentCentered : null]}>
              {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
              {renderLabel()}
              {loading ? <ActivityIndicator size="small" color={palette.label} style={styles.spinner} /> : <View style={styles.spinner} />}
            </View>
          </LinearGradient>
        ) : (
          <View style={[styles.innerLayer, { backgroundColor: backgroundColors[0] }]}>
            <View style={[styles.content, centerContent ? styles.contentCentered : null]}>
              {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
              {renderLabel()}
              {loading ? <ActivityIndicator size="small" color={palette.label} style={styles.spinner} /> : <View style={styles.spinner} />}
            </View>
          </View>
        )}
      </View>
      )}
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
    justifyContent: 'flex-start',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
  },
  contentCentered: {
    justifyContent: 'center',
  },
  label: {
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  hiddenLabel: {
    opacity: 0,
  },
  maskLabel: {
    color: '#000',
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    position: 'absolute',
    right: 12,
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
      return { background: BrandColors.facebook, border: BrandColors.facebook, label: BrandColors.text };
    case 'google':
      return { background: BrandColors.google, border: BrandColors.google, label: BrandColors.text };
    default:
      return { background: BrandColors.primary, border: BrandColors.primary, label: BrandColors.onPrimary };
  }
}

function ensureTwoStops(colors?: string[]): GradientColors | undefined {
  if (!colors || colors.length === 0) {
    return undefined;
  }

  if (colors.length === 1) {
    return [colors[0], colors[0]] as GradientColors;
  }

  return colors as unknown as GradientColors;
}
