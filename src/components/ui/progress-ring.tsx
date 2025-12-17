import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

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
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

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
          stroke={BrandColors.secondary}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.labelContainer}>
        <ThemedText size={24} style={[styles.percentage, { color: colors.onBrand }]}>{`${clamped}%`}</ThemedText>
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
  percentage: {
    fontWeight: '800',
  },
  caption: {
    marginTop: 6,
    fontWeight: '700',
  },
});
