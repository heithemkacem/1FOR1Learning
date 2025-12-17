import React from 'react';
import { StyleSheet, View } from 'react-native';

import { FacebookIcon } from '@/src/assets/images/icons/FacebookIcon';
import { GoogleIcon } from '@/src/assets/images/icons/GoogleIcon';
import { BrandButton } from '@/src/components/ui/brand-button';

type Props = {
  onOAuth: (provider: 'facebook' | 'google') => void;
};

export function SocialLogins({ onOAuth }: Props) {
  return (
    <View style={styles.container}>
      <BrandButton
        label="Continue with Facebook"
        variant="facebook"
        onPress={() => onOAuth('facebook')}
        leftIcon={<FacebookIcon />}
        backgroundGradientColors={["#242424"]}
        borderGradientColors={["#44DBE5", "#47FF8E"]}
        backgroundGradientStart={{ x: 0, y: 0.5 }}
        backgroundGradientEnd={{ x: 1, y: 0.5 }}
      />
      <BrandButton
        label="Continue with Google"
        variant="google"
        onPress={() => onOAuth('google')}
        leftIcon={<GoogleIcon />}
        backgroundGradientColors={["#242424"]}
        borderGradientColors={["#44DBE5", "#47FF8E"]}
        backgroundGradientStart={{ x: 0, y: 0.5 }}
        backgroundGradientEnd={{ x: 1, y: 0.5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 24,
  },
});
