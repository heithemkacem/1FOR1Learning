import { useThemeColor } from '@/src/hooks/use-theme-color';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, type SafeAreaViewProps } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/use-theme';
import { ThemedView } from './themed-view';

type ThemedScreenProps = SafeAreaViewProps & {
  children?: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  colorName?: Parameters<typeof useThemeColor>[1];
};

export function ThemedScreen({
  children,
  style,
  edges,
  lightColor,
  darkColor,
  colorName = 'screen',
  ...rest
}: ThemedScreenProps) {
    const {isLight} = useTheme()
  return (
    <ThemedView colorName={colorName} lightColor={lightColor} darkColor={darkColor} style={styles.fill}>
      <SafeAreaView style={[styles.fill, style]} edges={edges ?? ['top', 'bottom']} {...rest}>
        {children}
      </SafeAreaView>
      <StatusBar style={isLight ? 'dark' : 'light'} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
