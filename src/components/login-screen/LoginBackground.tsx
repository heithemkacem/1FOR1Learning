import React from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop, SvgXml } from 'react-native-svg';

import BackgroundImage from '@/src/assets/images/background/Background.png';
import { LanguageIcon } from '@/src/assets/images/icons/LanguageIcon';
import { ThemedText } from '@/src/components/themed-text';

type Props = {
  whiteLogoXml: string;
};

export function LoginBackground({ whiteLogoXml }: Props) {
  return (
    <ImageBackground source={BackgroundImage} style={styles.hero} imageStyle={styles.heroImage}>
      <View style={styles.heroHeader}>
        <ThemedText size={24} style={styles.slogan} lightColor="#EDEDED" darkColor="#EDEDED">
          Welcome to
        </ThemedText>
        <SvgXml xml={whiteLogoXml} width={styles.logo.width} height={styles.logo.height} />
        <ThemedText size={24} style={styles.subtitle} lightColor="#EDEDED" darkColor="#EDEDED">
          Learn 1FOR1 your way
        </ThemedText>
      </View>

      <Pressable style={styles.languageToggle}>
        <Svg pointerEvents="none" style={styles.languageBorder} width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Defs>
            <LinearGradient id="langGradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor="#FFFFFF" />
              <Stop offset="1" stopColor="#F3FF47" />
            </LinearGradient>
          </Defs>
          <Rect x="0.5" y="0.5" width="43" height="43" rx="22" stroke="url(#langGradient)" fill="none" />
        </Svg>
        <LanguageIcon />
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginTop: 10,
    height: 290,
    padding: 20,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroImage: {
    transform: [{ scale: 1.05 }],
  },
  heroHeader: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slogan: {
    color: '#EDEDED',
    fontFamily: 'InterExtraBoldItalic',
    textAlign: 'center',
  },
  subtitle: {
    color: '#EDEDED',
    fontFamily: 'InterExtraBoldItalic',
    textAlign: 'center',
  },
  logo: {
    width: 160,
    height: 100,
  },
  languageToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
