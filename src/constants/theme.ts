/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const BrandColors = {
  primary: '#FFEB3B',
  secondary: '#00D8FF',
  accent: '#FFC117',
  dark: '#0F0F0F',
  card: '#1C1C1E',
  surface: '#22252A',
  overlay: 'rgba(0,0,0,0.45)',
  text: '#F4F4F5',
  mutedText: '#A6A6AA',
  danger: '#FF5C5C',
  facebook: '#0D8BF1',
  google: '#00C8FF',
  socialBg: '#242424',
  socialBorderStart: '#44DBE5',
  socialBorderEnd: '#47FF8E',
  authBorder: '#a8fc3bff',
  socialLabelStart: '#FFFF53',
  socialLabelEnd: '#44DBE5',
  onPrimary: '#0A0A0A',
  white: '#FFFFFF',
};

export type ThemeName = 'light' | 'dark';
export type ThemePreference = ThemeName | 'system';

type BaseColors = {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

type UIColors = {
  screen: string;
  screenAlt: string;
  card: string;
  cardMuted: string;
  surfaceMuted: string;
  border: string;
  borderStrong: string;
  scrim: string;
  purple: string;
  scrimStrong: string;
  onBrand: string;
  onDark: string;
  mutedText: string;
  accentPrimary: string;
  accentSecondary: string;
  accent: string;
  successBg: string;
  successText: string;
  errorBg: string;
  errorText: string;
  inputBg: string;
  inputBorder: string;
  pill: string;
};

export type ThemeColors = BaseColors & UIColors;

const BasePalette: Record<ThemeName, BaseColors> = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#242424',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

const UIpalette: Record<ThemeName, UIColors> = {
  light: {
    screen: '#FFFFFF',
    screenAlt: '#F5F5F7',
    card: '#FFFFFF',
    cardMuted: '#F5F6F8',
    surfaceMuted: '#EFEFF1',
    border: 'rgba(0,0,0,0.08)',
    borderStrong: 'rgba(0,0,0,0.14)',
    scrim: 'rgba(0,0,0,0.35)',
    scrimStrong: 'rgba(0,0,0,0.55)',
    onBrand: '#0A0A0A',
    onDark: '#FFFFFF',
    mutedText: '#6F7075',
    accentPrimary: BrandColors.primary,
    accentSecondary: BrandColors.secondary,
    accent: BrandColors.accent,
    purple:"#4000FF",
    successBg: '#0BBF63',
    successText: '#04160D',
    errorBg: '#FF5C5C',
    errorText: '#1A0A0A',
    inputBg: '#F2F2F3',
    inputBorder: '#CCCCCC',
    pill: 'rgba(0,0,0,0.08)',
  },
  dark: {
    screen: '#000000',
    screenAlt: '#111114',
    card: '#111114',
    cardMuted: '#1B1B1F',
    surfaceMuted: '#1B1B1F',
    border: 'rgba(255,255,255,0.1)',
    borderStrong: 'rgba(255,255,255,0.14)',
    scrim: 'rgba(0,0,0,0.45)',
    purple:"#4000FF",
    scrimStrong: 'rgba(0,0,0,0.6)',
    onBrand: '#0A0A0A',
    onDark: '#FFFFFF',
    mutedText: '#A6A6AA',
    accentPrimary: BrandColors.primary,
    accentSecondary: BrandColors.secondary,
    accent: BrandColors.accent,
    successBg: '#0BBF63',
    successText: '#04160D',
    errorBg: '#FF5C5C',
    errorText: '#1A0A0A',
    inputBg: '#1A1A1D',
    inputBorder: '#FFFFFF',
    pill: 'rgba(255,255,255,0.12)',
  },
};

export const Colors: Record<ThemeName, ThemeColors> = {
  light: { ...BasePalette.light, ...UIpalette.light },
  dark: { ...BasePalette.dark, ...UIpalette.dark },
};

export function getThemeColors(theme: ThemeName): ThemeColors {
  return Colors[theme];
}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
