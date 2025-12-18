import React from 'react';
import { StyleSheet, View } from 'react-native';

import { FacebookIcon } from '@/src/assets/images/icons/FacebookIcon';
import { GoogleIcon } from '@/src/assets/images/icons/GoogleIcon';
import { BrandButton } from '@/src/components/ui/brand-button';
import { BrandColors } from '@/src/constants/theme';
import { useI18n } from '@/src/hooks/use-i18n';

type Props = {
  onOAuth: (provider: 'facebook' | 'google') => void;
};

export function SocialLogins({ onOAuth }: Props) {
  const { t } = useI18n();
  return (
    <View style={styles.container}>
      <BrandButton
        label={t('login.continueWithFacebook')}
        variant="facebook"
        onPress={() => onOAuth('facebook')}
        leftIcon={<FacebookIcon />}
        backgroundGradientColors={[BrandColors.socialBg]}
        borderGradientColors={[BrandColors.socialBorderStart, BrandColors.socialBorderEnd]}
        backgroundGradientStart={{ x: 0, y: 0.5 }}
        backgroundGradientEnd={{ x: 1, y: 0.5 }}
        labelGradientColors={[BrandColors.socialLabelStart, BrandColors.socialLabelEnd]}
        labelGradientStart={{ x: 0, y: 0.5 }}
        labelGradientEnd={{ x: 1, y: 0.5 }}
      />
      <BrandButton
        label={t('login.continueWithGoogle')}
        variant="google"
        onPress={() => onOAuth('google')}
        leftIcon={<GoogleIcon />}
        backgroundGradientColors={[BrandColors.socialBg]}
        borderGradientColors={[BrandColors.socialBorderStart, BrandColors.socialBorderEnd]}
        backgroundGradientStart={{ x: 0, y: 0.5 }}
        backgroundGradientEnd={{ x: 1, y: 0.5 }}
        labelGradientColors={[BrandColors.socialLabelStart, BrandColors.socialLabelEnd]}
        labelGradientStart={{ x: 0, y: 0.5 }}
        labelGradientEnd={{ x: 1, y: 0.5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 16,
  },
});
