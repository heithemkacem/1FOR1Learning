import { useI18n } from '@/src/hooks/use-i18n';
import { useQuery } from '@tanstack/react-query';
import type { ImageSourcePropType } from 'react-native';

// Assets
import BackgroundImage from '@/src/assets/images/discover/Image_Background.png';
import TunisiaImage from '@/src/assets/images/discover/Image_Tunisia.png';
import TunisiaTwoImage from '@/src/assets/images/discover/Image_Tunisia_Two.png';
import VideoCoverImage from '@/src/assets/images/discover/Video_Cover_Image.png';

export type DiscoverData = {
  hero: ImageSourcePropType;
  likes: string;
  description: string;
  sections: { title: string; copy: string; image: ImageSourcePropType }[];
  video: { title: string; url: string; cover: ImageSourcePropType; copy: string };
};


const useDiscoverData = (t: (key: string) => string): DiscoverData => {
  return {
    hero: BackgroundImage,
    likes: '1.2K',
    description: t('discover.description'),
    sections: [
      {
        title: t('discover.sections.0.title'),
        copy: t('discover.sections.0.copy'),
        image: TunisiaImage,
      },
      {
        title: t('discover.sections.1.title'),
        copy: t('discover.sections.1.copy'),
        image: TunisiaTwoImage,
      },
    ],
    video: {
      title: t('discover.video.title'),
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      cover: VideoCoverImage,
      copy: t('discover.video.copy'),
    },
  };
};

export const useDiscover = () => {
  const { t } = useI18n();
  return useQuery({
    queryKey: ['discover', t('lang')],
    queryFn: () => Promise.resolve(useDiscoverData(t)),
    staleTime: 1000 * 60 * 5,
  });
};
