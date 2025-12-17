import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedScreen } from '@/src/components/themed-screen';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { BrandButton } from '@/src/components/ui/brand-button';
import { useTheme } from '@/src/hooks/use-theme';

type DiscoverData = {
  hero: string;
  flag: string;
  likes: string;
  description: string;
  slides: string[];
  sections: { title: string; copy: string; image: string }[];
};

const fetchDiscover = async (): Promise<DiscoverData> => {
  return {
    hero: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1600&q=80',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg',
    likes: '1.2K',
    description:
      "Tunisia is a land where history, nature, and hospitality come together. From the golden dunes of the Sahara to the turquoise coasts of the Mediterranean, every corner tells a story. It's a country of contrasts — ancient yet modern, peaceful yet vibrant, where tradition lives hand in hand with progress.",
    slides: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520881363902-a0ff4e722963?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80',
    ],
    sections: [
      {
        title: 'Historical & Heritage Description',
        copy: 'Tunisia intertwines the stories of vibrant civilizations. From the sands of Carthage where legend and intellect merged, to the medina of Tunis, layers of stone and souks preserve centuries of cultural exchange.',
        image: 'https://images.unsplash.com/photo-1582719478248-54e9f2d6c39d?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Cultural & Artistic Description',
        copy: 'Pottery, calligraphy, and music pour joy into the markets. Each alley hums with craft, color, and culinary rituals. Festivals pulse with dance, oud, and folklore, keeping heritage vivid and alive.',
        image: 'https://images.unsplash.com/photo-1505762956754-cb1ab0c5fe46?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Nature & Landscape',
        copy: 'From azure coasts to desert oases, Tunisia’s landscapes are invitations to pause. Mountains embrace villages; seascapes stretch calm horizons, offering quiet escapes or spirited adventures.',
        image: 'https://images.unsplash.com/photo-1476611338391-6f395a0ebc71?auto=format&fit=crop&w=800&q=80',
      },
    ],
  };
};

export default function DiscoverScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { colors } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const { width } = useWindowDimensions();

  const { data } = useQuery({ queryKey: ['discover'], queryFn: fetchDiscover, staleTime: 1000 * 60 * 5 });

  const slides = data?.slides ?? [];
  const slideWidth = Math.max(260, width - 48);

  const onScroll = useCallback(
    ({ nativeEvent }: any) => {
      if (!nativeEvent?.contentOffset) return;
      const { contentOffset, layoutMeasurement } = nativeEvent;
      const index = Math.round(contentOffset.x / layoutMeasurement.width);
      if (index !== activeSlide) setActiveSlide(index);
    },
    [activeSlide],
  );

  const handleLogout = async () => {
    await signOut();
    router.replace('/login');
  };

  if (!data) return null;

  return (
    <ThemedScreen style={styles.safeArea}>
      <ImageBackground source={{ uri: data.hero }} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={[styles.overlay, { backgroundColor: colors.scrim }]} />
        <View style={styles.headerRow}>
          <View style={styles.flagRow}>
            <Image source={{ uri: data.flag }} style={[styles.flag, { backgroundColor: colors.onDark }]} />
            <ThemedText size={16} style={[styles.flagText, { color: colors.onDark }]} lightColor={colors.onDark} darkColor={colors.onDark}>
              Tunisia
            </ThemedText>
          </View>
          <BrandButton label="Logout" variant="ghost" onPress={handleLogout} />
        </View>

        <View style={styles.titleBlock}>
          <ThemedText size={30} style={[styles.title, { color: colors.onDark }]} lightColor={colors.onDark} darkColor={colors.onDark}>
            Discover
          </ThemedText>
          <ThemedText size={30} style={[styles.title, { color: colors.onDark }]} lightColor={colors.onDark} darkColor={colors.onDark}>
            Tunisian traditions
          </ThemedText>
        </View>

        <ThemedView style={[styles.card, { borderColor: colors.border }]} lightColor={colors.card} darkColor={colors.card}>
          <View style={styles.cardHeader}>
            <ThemedText size={18} style={[styles.cardTitle, { color: colors.onDark }]} lightColor={colors.onDark} darkColor={colors.onDark}>
              Tunisia
            </ThemedText>
            <View style={[styles.likes, { backgroundColor: colors.pill }]}> 
              <Ionicons name="heart" size={16} color={colors.accentPrimary} />
              <ThemedText style={[styles.likesText, { color: colors.onDark }]} lightColor={colors.onDark} darkColor={colors.onDark}>
                {data.likes}
              </ThemedText>
            </View>
          </View>
          <ThemedText size={14} style={[styles.cardCopy, { color: colors.text }]} lightColor={colors.text} darkColor={colors.text}>
            {data.description}
          </ThemedText>
        </ThemedView>

        <View style={styles.carouselWrapper}>
          <FlatList
            data={slides}
            renderItem={({ item }) => <Image source={{ uri: item }} style={[styles.slide, { width: slideWidth }]} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, idx) => `${item}-${idx}`}
            onScroll={onScroll}
            scrollEventThrottle={16}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={slideWidth + 12}
          />
          <View style={[styles.carouselMeta, { backgroundColor: colors.scrimStrong }]}>
            <ThemedText style={[styles.carouselText, { color: colors.onDark }]}>{`${activeSlide + 1}/${slides.length}`}</ThemedText>
          </View>
        </View>
      </ImageBackground>

      <ThemedView style={styles.sections} lightColor={colors.screen} darkColor={colors.screen}>
        {data.sections.map((section) => (
          <ThemedView
            key={section.title}
            style={[styles.sectionCard, { borderColor: colors.border }]}
            lightColor={colors.card}
            darkColor={colors.card}>
            <Image source={{ uri: section.image }} style={[styles.sectionImage, { backgroundColor: colors.surfaceMuted }]} />
            <View style={styles.sectionContent}>
              <ThemedText size={15} style={[styles.sectionTitle, { color: colors.accentPrimary }]} lightColor={colors.accentPrimary} darkColor={colors.accentPrimary}>
                {section.title}
              </ThemedText>
              <ThemedText size={13} style={[styles.sectionCopy, { color: colors.text }]} lightColor={colors.text} darkColor={colors.text}>
                {section.copy}
              </ThemedText>
            </View>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  hero: {
    height: 520,
    paddingHorizontal: 18,
    paddingTop: 12,
    justifyContent: 'flex-start',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  flagText: {
    fontWeight: '800',
  },
  titleBlock: {
    marginTop: 40,
    gap: -2,
  },
  title: {
    fontWeight: '900',
  },
  card: {
    marginTop: 22,
    borderRadius: 18,
    padding: 16,
    gap: 10,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: '800',
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  likesText: {
    fontWeight: '700',
  },
  cardCopy: {
    lineHeight: 20,
  },
  carouselWrapper: {
    marginTop: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  slide: {
    width: 320,
    height: 200,
    marginRight: 12,
    borderRadius: 14,
  },
  carouselMeta: {
    position: 'absolute',
    bottom: 10,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  carouselText: {
    fontWeight: '700',
  },
  sections: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 14,
  },
  sectionCard: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
  },
  sectionImage: {
    height: 180,
    width: '100%',
  },
  sectionContent: {
    padding: 14,
    gap: 8,
  },
  sectionTitle: {
    fontWeight: '800',
  },
  sectionCopy: {
    lineHeight: 19,
  },
});
