import * as React from 'react';
import Svg, { Path, G, Circle, ClipPath, Defs, Rect } from 'react-native-svg';
import { COLORS } from '../../src/application/common';

export function EmptyIcon({ color = COLORS.REDICON, width = 220 }) {
  return (
    <Svg width={width} height={width} viewBox="0 0 220 220" fill="none">
      <G>
        <Circle cx="110" cy="110" r="110" fill={COLORS.GRAYBRAND} />
      </G>
      <G clip-path="url(#clip0_76192_144924)">
        <Path
          d="M109.501 72.625V48.125L78.043 78.75L109.501 109.375V84.875C130.358 84.875 147.251 101.321 147.251 121.625C147.251 141.929 130.358 158.375 109.501 158.375C88.6444 158.375 71.7513 141.929 71.7513 121.625H59.168C59.168 148.698 81.6921 170.625 109.501 170.625C137.31 170.625 159.835 148.698 159.835 121.625C159.835 94.5525 137.31 72.625 109.501 72.625Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_76192_144924">
          <Rect
            width="151"
            height="147"
            fill="transparent"
            transform="translate(34 42)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
