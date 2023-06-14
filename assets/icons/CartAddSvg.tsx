import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Svg, { Path, SvgProps } from 'react-native-svg';
import { COLORS } from '../../src/application/common/colors';

function CartAddSvg(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 18}
      height={props.height ?? 18}
      viewBox="0 0 19 20"
      fill="none">
      <Path
        d="M9.52381 6.66663C9.52381 7.19261 9.9502 7.619 10.4762 7.619C11.0022 7.619 11.4286 7.19261 11.4286 6.66663V4.76188H13.3333C13.8593 4.76188 14.2857 4.33548 14.2857 3.8095C14.2857 3.28352 13.8593 2.85713 13.3333 2.85713H11.4286V0.952375C11.4286 0.426393 11.0022 0 10.4762 0C9.9502 0 9.52381 0.426393 9.52381 0.952375V2.85713H7.61905C7.09306 2.85713 6.66667 3.28352 6.66667 3.8095C6.66667 4.33548 7.09306 4.76188 7.61905 4.76188H9.52381V6.66663ZM5.71428 16.1904C4.6619 16.1904 3.81905 17.0428 3.81905 18.0951C3.81905 19.1475 4.6619 19.9999 5.71428 19.9999C6.76666 19.9999 7.61905 19.1475 7.61905 18.0951C7.61905 17.0428 6.76666 16.1904 5.71428 16.1904ZM15.2381 16.1904C14.1857 16.1904 13.3429 17.0428 13.3429 18.0951C13.3429 19.1475 14.1857 19.9999 15.2381 19.9999C16.2905 19.9999 17.1429 19.1475 17.1429 18.0951C17.1429 17.0428 16.2905 16.1904 15.2381 16.1904ZM5.88095 13.0952C5.88095 13.0523 5.89047 13.0142 5.90952 12.9809L6.49499 11.9205C6.6626 11.617 6.98196 11.4285 7.32872 11.4285H13.8619C14.5762 11.4285 15.2 11.0333 15.5286 10.4476L18.7448 4.60672C18.9987 4.1456 18.8302 3.56595 18.3687 3.31278C17.9093 3.06076 17.3326 3.22733 17.0784 3.68548L16.4809 4.76188L14.1287 9.03098C13.9612 9.33496 13.6416 9.52375 13.2945 9.52375H7.46159C7.28711 9.52375 7.12807 9.42381 7.05238 9.26661L4.00952 2.85713L3.36728 1.49788C3.2099 1.16482 2.87456 0.952375 2.50618 0.952375H0.952381C0.426396 0.952375 0 1.37877 0 1.90475C0 2.43073 0.426395 2.85713 0.952381 2.85713H1.90476L5.33333 10.0809L4.04286 12.4142C3.89524 12.6904 3.80952 12.9999 3.80952 13.3333C3.80952 14.3856 4.6619 15.238 5.71428 15.238H16.1905C16.7165 15.238 17.1429 14.8116 17.1429 14.2856C17.1429 13.7596 16.7165 13.3333 16.1905 13.3333H6.11905C5.98571 13.3333 5.88095 13.2285 5.88095 13.0952Z"
        fill={props.color ?? COLORS.WHITE}
      />
    </Svg>
  );
}

export default CartAddSvg;