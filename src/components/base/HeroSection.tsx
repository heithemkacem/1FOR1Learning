import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

import { LikeIcon } from '@/src/assets/images/icons/LikeIcon';
import { TunisiaFlag } from '@/src/assets/images/icons/TunisiaFlag';
import { scale, scaleFont } from '@/src/utils/scaler';
import { ThemedText } from '../global';

type HeroSectionProps = {
  imageSource: ImageSourcePropType;
};

const HeroSection: React.FC<HeroSectionProps> = ({ imageSource }) => {
  return (
    <ImageBackground source={imageSource} style={styles.hero} imageStyle={styles.heroImage}>
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={styles.headerRow}>
        <View />
        <TouchableOpacity style={styles.likeButton} >
          <LikeIcon size={scale(24)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleBlock}>
        <TunisiaFlag size={scale(120)} />
        <ThemedText style={[styles.heroTitle, { color: '#FFFFFF' }]}>Discover</ThemedText>
        <ThemedText style={[styles.heroTitle, { color: '#FFFFFF' }]}>Tunisian</ThemedText>
        <ThemedText style={[styles.heroTitle, { color: '#FFFFFF' }]}>traditions</ThemedText>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  hero: {
    height: scale(480),
    paddingHorizontal: scale(20),
    paddingTop: scale(50),
    justifyContent: 'flex-start',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  likeButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
    marginTop: scale(-40),
  },
  heroTitle: {
    fontSize: scaleFont(36),
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: scaleFont(44),
  },
});

export default HeroSection;
