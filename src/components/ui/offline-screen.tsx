import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

import { useI18n } from '@/src/hooks/use-i18n';
import { useTheme } from '@/src/hooks/use-theme';

import { ThemedScreen, ThemedText } from '../global';
import { BrandButton } from './brand-button';

type Props = {
  onRetry?: () => void;
};

export function OfflineScreen({ onRetry }: Props) {
  const { colors } = useTheme();
  const { t } = useI18n();
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for the icon
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // Subtle rotation for the signal rings
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotate.start();

    return () => {
      pulse.stop();
      rotate.stop();
    };
  }, [fadeAnim, pulseAnim, rotateAnim, slideAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ThemedScreen style={styles.screen}>
      <LinearGradient
        colors={[colors.screen, colors.screenAlt, colors.screen]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      <Animated.View 
        style={[
          styles.container, 
          { 
            opacity: fadeAnim, 
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        {/* Animated background rings */}
        <Animated.View style={[styles.ringsContainer, { transform: [{ rotate: rotation }] }]}>
          <Svg width={280} height={280} viewBox="0 0 280 280">
            <Defs>
              <SvgLinearGradient id="ringGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={colors.accentPrimary} stopOpacity="0.3" />
                <Stop offset="100%" stopColor={colors.accentSecondary} stopOpacity="0.1" />
              </SvgLinearGradient>
              <SvgLinearGradient id="ringGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={colors.accentSecondary} stopOpacity="0.2" />
                <Stop offset="100%" stopColor={colors.accentPrimary} stopOpacity="0.05" />
              </SvgLinearGradient>
            </Defs>
            <Circle
              cx="140"
              cy="140"
              r="130"
              stroke="url(#ringGradient1)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="20 10"
            />
            <Circle
              cx="140"
              cy="140"
              r="110"
              stroke="url(#ringGradient2)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="15 8"
            />
            <Circle
              cx="140"
              cy="140"
              r="90"
              stroke="url(#ringGradient1)"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="10 5"
            />
          </Svg>
        </Animated.View>

        {/* Main icon container */}
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
          <LinearGradient
            colors={[colors.cardMuted, colors.card]}
            style={styles.iconBackground}
          >
            <View style={[styles.iconInner, { borderColor: colors.border }]}>
              <Ionicons name="cloud-offline-outline" size={64} color={colors.accentSecondary} />
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <ThemedText
            size={28} 
            type="extraBold" 
            style={[styles.title, { color: colors.text }]}
          >
            {t('offline.title')}
          </ThemedText>
          
          <ThemedText 
            size={16} 
            style={[styles.subtitle, { color: colors.mutedText }]}
          >
            {t('offline.message')}
          </ThemedText>
        </View>

        {/* Status indicator */}
        <View style={[styles.statusContainer, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
          <View style={[styles.statusDot, { backgroundColor: colors.errorBg }]} />
          <ThemedText size={14} style={{ color: colors.mutedText }}>
            {t('offline.status')}
          </ThemedText>
        </View>

        {/* Retry button */}
        {onRetry && (
          <View style={styles.buttonContainer}>
            <BrandButton
              label={t('offline.retry')}
              onPress={onRetry}
              backgroundGradientColors={[colors.accentPrimary]}
              borderGradientColors={[colors.accentSecondary, colors.accentPrimary]}
              centerContent
            />
          </View>
        )}

        {/* Tips section */}
        <View style={[styles.tipsContainer, { backgroundColor: colors.cardMuted, borderColor: colors.border }]}>
          <ThemedText size={14} type="semiBold" style={[styles.tipsTitle, { color: colors.text }]}>
            {t('offline.tipsTitle')}
          </ThemedText>
          <View style={styles.tipRow}>
            <Ionicons name="wifi-outline" size={18} color={colors.accentSecondary} />
            <ThemedText size={13} style={[styles.tipText, { color: colors.mutedText }]}>
              {t('offline.tip1')}
            </ThemedText>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="airplane-outline" size={18} color={colors.accentSecondary} />
            <ThemedText size={13} style={[styles.tipText, { color: colors.mutedText }]}>
              {t('offline.tip2')}
            </ThemedText>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="refresh-outline" size={18} color={colors.accentSecondary} />
            <ThemedText size={13} style={[styles.tipText, { color: colors.mutedText }]}>
              {t('offline.tip3')}
            </ThemedText>
          </View>
        </View>
      </Animated.View>
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  ringsContainer: {
    position: 'absolute',
    width: 280,
    height: 280,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 280,
    marginBottom: 32,
  },
  tipsContainer: {
    width: '100%',
    maxWidth: 320,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  tipsTitle: {
    marginBottom: 4,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipText: {
    flex: 1,
    lineHeight: 18,
  },
});
