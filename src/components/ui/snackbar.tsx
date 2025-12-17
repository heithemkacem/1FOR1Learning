import { Ionicons } from '@expo/vector-icons';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandColors } from '@/src/constants/theme';
import { ThemedText } from '../themed-text';

export type SnackVariant = 'info' | 'success' | 'error';

type SnackOptions = {
  message: string;
  variant?: SnackVariant;
  duration?: number;
};

type SnackBarContextValue = {
  showSnack: (options: SnackOptions) => void;
  hideSnack: () => void;
};

const SnackBarContext = createContext<SnackBarContextValue | undefined>(undefined);

export function SnackBarProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<SnackVariant>('info');
  const translateY = useRef(new Animated.Value(60)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const baseDuration = 3200;

  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 240,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  const animateOut = useCallback((onEnd?: () => void) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 60,
        duration: 220,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      onEnd?.();
    });
  }, [opacity, translateY]);

  const hideSnack = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    animateOut();
  }, [animateOut]);

  const showSnack = useCallback(
    ({ message: nextMessage, variant: nextVariant = 'info', duration }: SnackOptions) => {
      if (!nextMessage) return;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setMessage(nextMessage);
      setVariant(nextVariant);
      setVisible(true);
      animateIn();
      timerRef.current = setTimeout(() => {
        hideSnack();
      }, duration ?? baseDuration);
    },
    [animateIn, hideSnack],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const colors = useMemo(() => {
    switch (variant) {
      case 'success':
        return { background: '#0BBF63', text: '#04160D', icon: 'checkmark-circle' as const };
      case 'error':
        return { background: '#FF5C5C', text: '#1A0A0A', icon: 'alert-circle' as const };
      default:
        return { background: BrandColors.secondary, text: '#041018', icon: 'information-circle' as const };
    }
  }, [variant]);

  const value = useMemo(() => ({ showSnack, hideSnack }), [showSnack, hideSnack]);

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {visible ? (
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.container,
            { paddingBottom: Math.max(insets.bottom, 14) + 8 },
            { opacity, transform: [{ translateY }] },
          ]}>
          <Pressable onPress={hideSnack} style={[styles.snack, { backgroundColor: colors.background }]}> 
            <View style={styles.iconBadge}>
              <Ionicons name={colors.icon} size={18} color={colors.text} />
            </View>
            <ThemedText size={14} style={[styles.message, { color: colors.text }]} numberOfLines={3}>
              {message}
            </ThemedText>
            <Ionicons name="close" size={18} color={colors.text} style={styles.close} />
          </Pressable>
        </Animated.View>
      ) : null}
    </SnackBarContext.Provider>
  );
}

export function useSnackBar() {
  const ctx = useContext(SnackBarContext);
  if (!ctx) throw new Error('useSnackBar must be used within SnackBarProvider');
  return ctx;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  snack: {
    minHeight: 52,
    maxWidth: 420,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  message: {
    flex: 1,
    fontWeight: '700',
    lineHeight: 20,
  },
  close: {
    opacity: 0.75,
  },
});
