import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';


import { useDiscover } from '@/src/hooks/querys/use-discover';
import { useI18n } from '@/src/hooks/use-i18n';
import { useTheme } from '@/src/hooks/use-theme';
import { scale } from '@/src/utils/scaler';

export default function DiscoverScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { colors } = useTheme();
  const { t } = useI18n();

  const { data } = useDiscover();

  const handleLogout = async () => {
    await signOut();
    router.replace('/login');
  };

  if (!data) return null;

  return (
    <ThemedScreen style={styles.safeArea}>
     
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <HeroSection imageSource={data.hero} />
        <View style={[styles.contentContainer, { backgroundColor: colors.screen }]}> 
          <DiscoverSection
            title="Tunisia"
            likes={data.likes}
            copy={data.description}
            accentColor={colors.accent}
            hasLike
          />
          {data.sections.map((section, index) => (
            <DiscoverSection
              key={index}
              title={section.title}
              copy={section.copy}
              imageSource={section.image}
              accentColor={colors.accent}
            />
          ))}
          <DiscoverSection
            title={data.video.title}
            videoUri={data.video.url}
            imageSource={data.video.cover}
            accentColor={colors.accent}
            copy={data.video.copy}
            hasVideo
          />
        </View>
      </ScrollView>
       <View style={styles.logoutContainer}>
        <View style={{ flex: 1 }} />
        <View>
          <LogoutButton onPress={handleLogout} />
        </View>
      </View>
    </ThemedScreen>
  );
}

import { DiscoverSection, HeroSection } from '@/src/components/base';
import { ThemedScreen } from '@/src/components/global/themed-screen';
import { Text, TouchableOpacity } from 'react-native';

const LogoutButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={{ padding: 10, backgroundColor: '#E53935', borderRadius: 8 }}>
    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  logoutContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: scale(16),
    paddingTop: scale(20),
    paddingBottom: scale(40),
    gap: scale(20),
  },
});
