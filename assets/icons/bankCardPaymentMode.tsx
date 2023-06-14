import * as React from 'react';
import { Svg, Path, Color } from 'react-native-svg';
import { COLORS } from '../../src/application/common';
export function BankCardPaymentMode({
  color = COLORS.REDICON,
  width = 40,
  height = 32
}: {
  color?: Color;
  width?: number;
  height?: number;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 32" fill="none">
      <Path
        d="M36 0H4C1.79 0 0.02 1.79 0.02 4L0 28C0 30.21 1.79 32 4 32H36C38.21 32 40 30.21 40 28V4C40 1.79 38.21 0 36 0ZM36 28H4V16H36V28ZM36 8H4V4H36V8Z"
        fill={color}
      />
    </Svg>
  );
}
