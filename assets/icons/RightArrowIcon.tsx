import * as React from 'react';
import { Svg, Path, Color } from 'react-native-svg';
import { COLORS } from '../../src/application/common';

export function RightArrowIcon({ color = COLORS.DARK70 }: { color?: Color }) {
  return (
    <Svg width="22" height="17" viewBox="0 0 22 17" fill="none" opacity={0.5}>
      <Path
        d="M13.3213 16.0541L12.2109 14.9777L18.062 9.12656H0.0214844V7.58133H18.062L12.1899 1.70926L13.3004 0.632812L21.0215 8.35396L13.3213 16.0541Z"
        fill={color}
        fill-opacity="0.5"
      />
    </Svg>
  );
}
