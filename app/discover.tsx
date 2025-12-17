import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { BrandButton } from '@/src/components/ui/brand-button';
import { BrandColors } from '@/src/constants/theme';

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
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={{ uri: data.hero }} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={styles.overlay} />
        <View style={styles.headerRow}>
          <View style={styles.flagRow}>
            <Image source={{ uri: data.flag }} style={styles.flag} />
            <ThemedText size={16} style={styles.flagText} lightColor="#FFFFFF" darkColor="#FFFFFF">
              Tunisia
            </ThemedText>
          </View>
          <BrandButton label="Logout" variant="ghost" onPress={handleLogout} />
        </View>

        <View style={styles.titleBlock}>
          <ThemedText size={30} style={styles.title} lightColor="#FFFFFF" darkColor="#FFFFFF">
            Discover
          </ThemedText>
          <ThemedText size={30} style={styles.title} lightColor="#FFFFFF" darkColor="#FFFFFF">
            Tunisian traditions
          </ThemedText>
        </View>

        <ThemedView style={styles.card} lightColor={BrandColors.overlay} darkColor={BrandColors.overlay}>
          <View style={styles.cardHeader}>
            <ThemedText size={18} style={styles.cardTitle} lightColor="#FFFFFF" darkColor="#FFFFFF">
              Tunisia
            </ThemedText>
            <View style={styles.likes}>
              <Ionicons name="heart" size={16} color={BrandColors.primary} />
              <ThemedText style={styles.likesText} lightColor="#FFFFFF" darkColor="#FFFFFF">
                {data.likes}
              </ThemedText>
            </View>
          </View>
          <ThemedText size={14} style={styles.cardCopy} lightColor="#EAEAEA" darkColor="#EAEAEA">
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
          <View style={styles.carouselMeta}>
            <ThemedText style={styles.carouselText}>{`${activeSlide + 1}/${slides.length}`}</ThemedText>
          </View>
        </View>
      </ImageBackground>

      <ThemedView style={styles.sections} lightColor="#0A0A0B" darkColor="#0A0A0B">
        {data.sections.map((section) => (
          <ThemedView
            key={section.title}
            style={styles.sectionCard}
            lightColor="#111114"
            darkColor="#111114">
            <Image source={{ uri: section.image }} style={styles.sectionImage} />
            <View style={styles.sectionContent}>
              <ThemedText size={15} style={styles.sectionTitle} lightColor={BrandColors.primary} darkColor={BrandColors.primary}>
                {section.title}
              </ThemedText>
              <ThemedText size={13} style={styles.sectionCopy} lightColor="#E6E6E8" darkColor="#E6E6E8">
                {section.copy}
              </ThemedText>
            </View>
          </ThemedView>
        ))}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0B',
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
    backgroundColor: 'rgba(0,0,0,0.45)',
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
    backgroundColor: '#FFFFFF',
  },
  flagText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  titleBlock: {
    marginTop: 40,
    gap: -2,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  card: {
    marginTop: 22,
    backgroundColor: BrandColors.overlay,
    borderRadius: 18,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  likesText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cardCopy: {
    color: '#EAEAEA',
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
    backgroundColor: '#1B1B1F',
  },
  carouselMeta: {
    position: 'absolute',
    bottom: 10,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  carouselText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sections: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 14,
  },
  sectionCard: {
    backgroundColor: '#111114',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1F1F24',
  },
  sectionImage: {
    height: 180,
    width: '100%',
    backgroundColor: '#1B1B1F',
  },
  sectionContent: {
    padding: 14,
    gap: 8,
  },
  sectionTitle: {
    color: BrandColors.primary,
    fontWeight: '800',
  },
  sectionCopy: {
    color: '#E6E6E8',
    lineHeight: 19,
  },
});
