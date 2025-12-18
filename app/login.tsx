import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { logo1for1Xml } from '@/src/assets/images/logo/logo1for1Xml';
import { IdentifierLogin } from '@/src/components/base/IdentifierLogin';
import { LegalNotice } from '@/src/components/base/LegalNotice';
import { LoginBackground } from '@/src/components/base/LoginBackground';
import { SocialLogins } from '@/src/components/base/SocialLogins';
import { ThemedScreen } from '@/src/components/global/themed-screen';
import { useClerkAuth } from '@/src/hooks/feature/useClerkAuth';
import { useTheme } from '@/src/hooks/use-theme';

export default function LoginScreen() {
  const {
    mode,
    identifier,
    code,
    loading,
    showVerify,
    selectMode,
    onIdentifierChange,
    onCodeChange,
    handleRequestCode,
    handleVerifyCode,
    handleOAuth,
  } = useClerkAuth();

  const { colors } = useTheme();
  const whiteLogoXml = useMemo(() => logo1for1Xml.replace(/#1D1D1B/gi, colors.onDark), [colors.onDark]);
  const handleSubmit = showVerify ? handleVerifyCode : handleRequestCode;

  return (
    <ThemedScreen colorName="background" style={styles.safeArea}>
    
      <ScrollView contentContainerStyle={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
        <LoginBackground whiteLogoXml={whiteLogoXml} />

        <View style={styles.card}>
          <IdentifierLogin
            mode={mode}
            identifier={identifier}
            code={code}
            showVerify={showVerify}
            loading={loading}
            onModeChange={selectMode}
            onIdentifierChange={onIdentifierChange}
            onCodeChange={onCodeChange}
            onSubmit={handleSubmit}
          />

          <SocialLogins onOAuth={handleOAuth} />
          <LegalNotice />
        </View>
      </ScrollView>
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  container: {
    paddingBottom: 32,
  },
  card: {
    borderRadius: 20,
    gap: 16,
    paddingHorizontal: 6,
  },
});
