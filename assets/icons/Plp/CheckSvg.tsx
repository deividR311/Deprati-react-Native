import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Svg, { Path, SvgProps } from 'react-native-svg';
import { COLORS } from '../../../src/application/common/colors';

function CheckSvg(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 21}
      height={props.height ?? 16}
      viewBox="0 0 21 16"
      fill="none">
      <Path
        d="M6.66961 12.6247L1.68979 7.65114L0 9.3388L6.66961 16L21 1.68766L19.3102 0L6.66961 12.6247Z"
        fill={props.color ?? COLORS.WHITE}
      />
    </Svg>
  );
}

export default CheckSvg;
