import React, { createContext, useContext, useMemo, useState } from 'react';

import { BrandColors, Colors, type ThemeName, type ThemePreference, getThemeColors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme';

type ThemeContextValue = {
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
  resolvedTheme: ThemeName;
  colors: typeof Colors.light;
  brand: typeof BrandColors;
  isDark: boolean;
  isLight: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme() ?? 'light';
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');

  const resolvedTheme: ThemeName = themePreference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : themePreference;

  const colors = useMemo(() => getThemeColors(resolvedTheme), [resolvedTheme]);
  const isDark = resolvedTheme === 'dark';
  const isLight = !isDark;

  const value: ThemeContextValue = useMemo(
    () => ({ themePreference, setThemePreference, resolvedTheme, colors, brand: BrandColors, isDark, isLight }),
    [themePreference, resolvedTheme, colors, isDark, isLight],
  );

  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx) return ctx;

  const fallbackTheme: ThemeName = 'light';
  const fallbackColors = getThemeColors(fallbackTheme);

  return {
    themePreference: 'system' as ThemePreference,
    setThemePreference: () => {},
    resolvedTheme: fallbackTheme,
    colors: fallbackColors,
    brand: BrandColors,
    isDark: false,
    isLight: true,
  };
}
