import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/use-theme-color';
import { scaleFont } from '@/src/utils/scaler';

export type ThemedTextProps = TextProps & {
  colorName?: Parameters<typeof useThemeColor>[0];
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
    | 'bold'
    | 'boldItalic'
    | 'extraBold'
    | 'extraBoldItalic'
    | 'black'
    | 'blackItalic';
};

export function ThemedText({
  style,
  colorName = 'text',
  size = 14,
  type = 'regular',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(colorName);

  return (
    <Text
      style={[
        { color, fontSize: scaleFont(size) },
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
  bold: {
    fontFamily: 'InterBold',
  },
  boldItalic: {
    fontFamily: 'InterBoldItalic',
  },
  extraBold: {
    fontFamily: 'InterExtraBold',
  },
  extraBoldItalic: {
    fontFamily: 'InterExtraBoldItalic',
  },
  black: {
    fontFamily: 'InterBlack',
  },
  blackItalic: {
    fontFamily: 'InterBlackItalic',
  },
});
