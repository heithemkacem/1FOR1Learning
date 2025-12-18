import { useTheme } from '@/src/hooks/use-theme';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, type SafeAreaViewProps } from 'react-native-safe-area-context';
import { ThemedView } from './themed-view';

export type ThemedScreenProps = SafeAreaViewProps & {
  children?: React.ReactNode;
  colorName?: Parameters<typeof useThemeColor>[0];
};

export function ThemedScreen({
  children,
  style,
  edges,
  colorName = 'screen',
  ...rest
}: ThemedScreenProps) {
    const {isLight} = useTheme()
  return (
    <ThemedView colorName={colorName} style={styles.fill}>
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
