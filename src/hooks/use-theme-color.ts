/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/src/constants/theme';
import { useTheme } from '@/src/hooks/use-theme';

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { colors } = useTheme();
  return colors[colorName];
}
