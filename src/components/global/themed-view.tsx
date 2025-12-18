import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  colorName?: Parameters<typeof useThemeColor>[0];
};

export function ThemedView({ style, colorName = 'screen', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(colorName);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
