import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Svg, { Path, SvgProps } from 'react-native-svg';
import { COLORS } from '../../../src/application/common';

export function HeartWhite(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 20}
      height={props.height ?? 20}
      viewBox="0 0 16 15"
      fill="none">
      <Path
        d="M11.6 0C10.208 0 8.872 0.648 8 1.668C7.128 0.648 5.792 0 4.4 0C1.932 0 0 1.932 0 4.4C0 7.42 2.72 9.888 6.84 13.628L8 14.68L9.16 13.628C13.28 9.888 16 7.42 16 4.4C16 1.932 14.068 0 11.6 0ZM8.084 12.444L8 12.52L7.916 12.444C4.112 8.992 1.6 6.712 1.6 4.4C1.6 2.804 2.804 1.6 4.4 1.6C5.632 1.6 6.832 2.396 7.252 3.488H8.744C9.168 2.396 10.368 1.6 11.6 1.6C13.196 1.6 14.4 2.804 14.4 4.4C14.4 6.712 11.888 8.992 8.084 12.444Z"
        fill={COLORS.DARK70}
      />
    </Svg>
  );
}

export function HeartRed(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 20}
      height={props.height ?? 20}
      viewBox="0 0 16 15"
      fill="none">
      <Path
        d="M11.6 0C10.208 0 8.872 0.648 8 1.668C7.128 0.648 5.792 0 4.4 0C1.932 0 0 1.932 0 4.4C0 7.42 2.72 9.888 6.84 13.628L8 14.68L9.16 13.628C13.28 9.888 16 7.42 16 4.4C16 1.932 14.068 0 11.6 0Z"
        fill={COLORS.DARKBRAND}
      />
    </Svg>
  );
}
