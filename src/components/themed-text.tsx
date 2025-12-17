import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  size?: number;
  type?:
    | 'thin'
    | 'thinItalic'
    | 'extraLight'
    | 'extraLightItalic'
    | 'light'
    | 'lightItalic'
    | 'regular'
    | 'italic'
    | 'medium'
    | 'mediumItalic'
    | 'semiBold'
    | 'semiBoldItalic'
    | 'extraBoldItalic';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  size = 14,
  type = 'regular',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color, fontSize: size },
        fontStyles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const fontStyles = StyleSheet.create({
  thin: {
    fontFamily: 'InterThin',
  },
  thinItalic: {
    fontFamily: 'InterThinItalic',
  },
  extraLight: {
    fontFamily: 'InterExtraLight',
  },
  extraLightItalic: {
    fontFamily: 'InterExtraLightItalic',
  },
  light: {
    fontFamily: 'InterLight',
  },
  lightItalic: {
    fontFamily: 'InterLightItalic',
  },
  regular: {
    fontFamily: 'InterRegular',
  },
  italic: {
    fontFamily: 'InterItalic',
  },
  medium: {
    fontFamily: 'InterMedium',
  },
  mediumItalic: {
    fontFamily: 'InterMediumItalic',
  },
  semiBold: {
    fontFamily: 'InterSemiBold',
  },
  semiBoldItalic: {
    fontFamily: 'InterSemiBoldItalic',
  },
  extraBoldItalic: {
    fontFamily: 'InterExtraBoldItalic',
  },
});
