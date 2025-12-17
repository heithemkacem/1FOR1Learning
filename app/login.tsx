import React, { useMemo } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { logo1for1Xml } from '@/src/assets/images/logo1for1Xml';
import { IdentifierLogin } from '@/src/components/login-screen/IdentifierLogin';
import { LegalNotice } from '@/src/components/login-screen/LegalNotice';
import { LoginBackground } from '@/src/components/login-screen/LoginBackground';
import { SocialLogins } from '@/src/components/login-screen/SocialLogins';
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

  const whiteLogoXml = useMemo(() => logo1for1Xml.replace(/#1D1D1B/gi, '#FFFFFF'), []);
  const handleSubmit = showVerify ? handleVerifyCode : handleRequestCode;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#0B0B0C',
  },
  container: {
    paddingBottom: 32,
    backgroundColor: '#0B0B0C',
  },
  card: {
    borderRadius: 20,
    gap: 16,
    paddingHorizontal: 6,
  },
});
