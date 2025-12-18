import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState } from 'react';
import { Image, ImageBackground, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

import { LikeIcon } from '@/src/assets/images/icons/LikeIcon';
import { useTheme } from '@/src/hooks/use-theme';
import { scale, scaleFont } from '@/src/utils/scaler';
import { ThemedText, ThemedView } from '../global';


type DiscoverSectionProps = {
  title: string;
  copy?: string;
  imageSource?: ImageSourcePropType;
  accentColor: string;
  videoUri?: string;
  likes?: string;
  hasLike?: boolean;
  hasVideo?: boolean;
};

const DiscoverSection: React.FC<DiscoverSectionProps> = ({
  title,
  copy,
  imageSource,
  accentColor,
  videoUri,
  likes,
  hasLike = false,
  hasVideo = false,
}) => {
  const { colors } = useTheme();
  const [playing, setPlaying] = useState(false);

  const player = useVideoPlayer(videoUri ?? '', player => {
    player.loop = false;
  });

  const handlePlay = () => {
    setPlaying(true);
    player.play();
  };

  return (
    <ThemedView>
      {hasVideo ? (
        <View style={styles.playerContainer}>
          {playing ? (
            <VideoView
              style={styles.video}
              player={player}
              allowsPictureInPicture
              contentFit="contain"
            />
          ) : (
            <TouchableOpacity style={styles.coverButton} onPress={handlePlay}>
              {imageSource && (
                <ImageBackground source={imageSource} style={styles.cover} imageStyle={styles.coverImage}>
                  <View style={styles.playBadge}>
                    <ThemedText style={[styles.playText, { color: '#FFFFFF' }]}>▶</ThemedText>
                  </View>
                </ImageBackground>
              )}
            </TouchableOpacity>
          )}
        </View>
      ) : (
        imageSource && <Image source={imageSource} style={styles.image} resizeMode="cover" />
      )}

      <ThemedView style={[styles.card, { borderColor: colors.border }]} colorName="cardMuted">
        <View style={styles.header}>
          <ThemedText size={20} type="bold" style={[{ color: accentColor }]}>
            {title}
          </ThemedText>
           {hasLike && likes && (
            <View style={styles.likesContainer}>
              <LikeIcon size={scale(18)} color="#FFFFFF" />
              <ThemedText style={[styles.likesText, { color: '#FFFFFF' }]}>
                {likes}
              </ThemedText>
            </View>
          )}
         
        </View>
        <ThemedText style={styles.copy} size={12}>
          {copy}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: scale(16),
    padding: scale(16),
    gap: scale(12),
    borderWidth: 1,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  copy: {
    lineHeight: scaleFont(22),
  },
  image: {
    width: '100%',
    height: scale(180),
    borderRadius: scale(24),
    marginBottom: scale(12),
    marginTop: scale(4),
  },
  playerContainer: {
    width: '100%',
    height: scale(180),
    borderRadius: scale(24),
    marginBottom: scale(12),
    marginTop: scale(4),
    overflow: 'hidden',
  },
  video: {
    flex: 1,
    backgroundColor: 'black',
  },
  coverButton: {
    flex: 1,
  },
  cover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    resizeMode: 'cover',
  },
  playBadge: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    fontSize: scaleFont(24),
    fontWeight: '700',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingVertical: scale(6),
    borderRadius: scale(20),
  },
  likesText: {
    fontSize: scaleFont(14),
    fontWeight: '500',
  },
});

export default DiscoverSection;
