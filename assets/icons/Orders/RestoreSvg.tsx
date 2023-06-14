import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { COLORS } from '../../../src/application/common/colors';

function RestoreSvg(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 101}
      height={props.width ?? 123}
      viewBox="0 0 101 123"
      fill="none">
      <Path
        d="M50.5013 24.625V0.125L19.043 30.75L50.5013 61.375V36.875C71.3582 36.875 88.2513 53.3206 88.2513 73.625C88.2513 93.9294 71.3582 110.375 50.5013 110.375C29.6444 110.375 12.7513 93.9294 12.7513 73.625H0.167969C0.167969 100.698 22.6921 122.625 50.5013 122.625C78.3105 122.625 100.835 100.698 100.835 73.625C100.835 46.5525 78.3105 24.625 50.5013 24.625Z"
        fill={props.color ?? COLORS.BRAND}
      />
    </Svg>
  );
}

export default RestoreSvg;
