import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  size?: number;
};

export function FacebookIcon({ size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.0002 0C-2.87981 0.435 -4.39481 21.315 10.1177 24H13.8902C28.3952 21.3075 26.8727 0.435 12.0002 0Z"
        fill="#1877F2"
      />
      <Path
        d="M13.8827 15.5625H16.6952L17.2277 12.075H13.8827V9.81003C13.8827 8.85753 14.3477 7.92753 15.8477 7.92753H17.3702V4.95753C14.1152 4.37253 10.2002 4.55253 10.1177 9.42003V12.0825H7.05774V15.57H10.1177V24.0075H13.8902V15.57L13.8827 15.5625Z"
        fill="#F1F1F1"
      />
    </Svg>
  );
}
