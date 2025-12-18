import * as React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

type Props = {
  size?: number;
};

export const DiscoverIcon = ({ size = 60 }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <Circle cx="30" cy="30" r="30" fill="#FFC117" />
    <G clipPath="url(#clip0)">
      <Path
        d="M30 15C25.0272 15 20.2581 17.0246 16.7417 20.5417C13.2254 24.0588 11.2002 28.8272 11.2002 33.8C11.2002 38.7728 13.2254 43.5412 16.7417 47.0583C20.2581 50.5754 25.0272 52.6 30 52.6C34.9728 52.6 39.7419 50.5754 43.2583 47.0583C46.7746 43.5412 48.7998 38.7728 48.7998 33.8C48.7998 28.8272 46.7746 24.0588 43.2583 20.5417C39.7419 17.0246 34.9728 15 30 15Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M30 15V7.4"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.4 7.4H36.6"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M30 33.8L38.8 24.2"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="30" cy="33.8" r="3" fill="white" />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="40" height="48" fill="white" transform="translate(10 6)" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default DiscoverIcon;
