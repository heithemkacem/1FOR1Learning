import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

import { logo1for1Xml } from '@/src/assets/images/logo1for1Xml';
import { ThemedView } from '@/src/components/themed-view';
import { BrandColors } from '@/src/constants/theme';

const logoXml = logo1for1Xml;

export default function SplashScreen() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 750,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 750, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace(isSignedIn ? '/discover' : '/login');
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, [isSignedIn, router, opacity, scale, translateY]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} lightColor={BrandColors.primary} darkColor={BrandColors.primary}>
        <Animated.View
          style={[styles.logoContainer, { opacity, transform: [{ translateY }, { scale }] }]}
        >
          <SvgXml xml={logoXml} width={styles.logo.width} height={styles.logo.height} />
        </Animated.View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BrandColors.primary },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 176,
    height: 176,
    resizeMode: 'contain',
  },
  logoTop: {
    fontWeight: '900',
    letterSpacing: 1.2,
    color: '#0A0A0A',
  },
  logoBottom: {
    marginTop: -4,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#0A0A0A',
  },
  footer: {
    alignItems: 'center',
    gap: 10,
  },
  caption: {
    fontWeight: '700',
    color: '#0A0A0A',
  },
});
