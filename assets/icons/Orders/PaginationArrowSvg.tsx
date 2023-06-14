import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Svg, { Path, SvgProps } from 'react-native-svg';
import { COLORS } from '../../../src/application/common/colors';

function PaginationArrowSvg(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 8}
      height={props.height ?? 12}
      viewBox="0 0 8 12"
      rotation={props.rotation ?? 0}
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.32103 6.17222C7.32103 5.99219 7.23888 5.82274 7.09807 5.69566L1.84144 0.951216C1.70064 0.824132 1.5129 0.75 1.31343 0.75C0.902758 0.75 0.5625 1.05712 0.5625 1.42778V10.9167C0.5625 11.2873 0.902758 11.5944 1.31343 11.5944C1.5129 11.5944 1.70064 11.5203 1.84144 11.3932L7.09807 6.64878C7.23888 6.5217 7.32103 6.35226 7.32103 6.17222Z"
        fill={props.color ?? COLORS.BRAND}
      />
    </Svg>
  );
}

export default PaginationArrowSvg;
