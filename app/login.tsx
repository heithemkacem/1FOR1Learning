import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { logo1for1Xml } from '@/src/assets/images/logo1for1Xml';
import { IdentifierLogin } from '@/src/components/screens/login-screen/IdentifierLogin';
import { LegalNotice } from '@/src/components/screens/login-screen/LegalNotice';
import { LoginBackground } from '@/src/components/screens/login-screen/LoginBackground';
import { SocialLogins } from '@/src/components/screens/login-screen/SocialLogins';
import { ThemedScreen } from '@/src/components/themed-screen';
import { useTheme } from '@/src/hooks/use-theme';
import { useClerkAuth } from '@/src/hooks/useClerkAuth';

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
    <ThemedScreen style={styles.safeArea}>
    
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
