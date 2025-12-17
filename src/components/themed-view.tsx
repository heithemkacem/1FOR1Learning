import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: Parameters<typeof useThemeColor>[1];
};

export function ThemedView({ style, lightColor, darkColor, colorName = 'screen', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
