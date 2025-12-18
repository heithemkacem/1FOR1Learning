import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { BrandColors } from '@/src/constants/theme';
import { useTheme } from '@/src/hooks/use-theme';
import { ThemedText } from '../themed-text';

type Props = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0-100
  label?: string;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function ProgressRing({ size = 180, strokeWidth = 10, progress, label }: Props) {
  const { colors } = useTheme();
  const clamped = Math.min(100, Math.max(0, progress));
  const animated = useSharedValue(clamped);
  const radius = (size - strokeWidth) / 2.2;
  const circumference = 2 * Math.PI * radius;
  const gradientId = useMemo(() => `progressGradient-${size}-${strokeWidth}`, [size, strokeWidth]);

  useEffect(() => {
    animated.value = withTiming(clamped, { duration: 700 });
  }, [animated, clamped]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference - (animated.value / 100) * circumference,
    };
  });

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}> 
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={BrandColors.socialBorderStart} />
            <Stop offset="100%" stopColor={BrandColors.socialBorderEnd} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={BrandColors.overlay}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.labelContainer}>
        <ThemedText type='bold' size={20} style={[ { color: colors.onBrand }]}>{`${clamped}%`}</ThemedText>
        {label ? <ThemedText size={13} style={[styles.caption, { color: colors.onBrand }]}>{label}</ThemedText> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
  },

  caption: {
    marginTop: 6,
  },
});
