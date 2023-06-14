import * as React from 'react';
import { Svg, Path, Color } from 'react-native-svg';
import { COLORS } from '../../src/application/common';

export function GiftCardPayment({ color = COLORS.BRAND }: { color?: Color }) {
  return (
    <Svg width="40" height="38" viewBox="0 0 40 38" fill="none">
      <Path
        d="M36 8H31.63C31.85 7.37 32 6.7 32 6C32 2.69 29.31 0 26 0C23.91 0 22.07 1.07 21 2.69L20 4.05L19 2.69C17.93 1.07 16.09 0 14 0C10.69 0 8 2.69 8 6C8 6.7 8.14 7.37 8.37 8H4C1.79 8 0.02 9.79 0.02 12L0 34C0 36.21 1.79 38 4 38H36C38.21 38 40 36.21 40 34V12C40 9.79 38.21 8 36 8ZM26 4C27.1 4 28 4.9 28 6C28 7.1 27.1 8 26 8C24.9 8 24 7.1 24 6C24 4.9 24.9 4 26 4ZM14 4C15.1 4 16 4.9 16 6C16 7.1 15.1 8 14 8C12.9 8 12 7.1 12 6C12 4.9 12.9 4 14 4ZM36 34H4V30H36V34ZM36 24H4V12H14.16L10 17.67L13.25 20L18 13.53L20 10.81L22 13.53L26.75 20L30 17.67L25.84 12H36V24Z"
        fill={color}
      />
    </Svg>
  );
}
