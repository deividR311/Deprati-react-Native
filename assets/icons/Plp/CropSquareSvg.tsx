import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Svg, { Path, SvgProps } from 'react-native-svg';

function CropSquareSvg(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 20}
      height={props.height ?? 20}
      viewBox="0 0 16 16"
      fill="none">
      <Path
        d="M1.6 0C0.716345 0 0 0.716344 0 1.6V14.4C0 15.2837 0.716344 16 1.6 16H14.4C15.2837 16 16 15.2837 16 14.4V1.6C16 0.716345 15.2837 0 14.4 0H1.6ZM14.2222 13.4222C14.2222 13.8641 13.8641 14.2222 13.4222 14.2222H2.57778C2.13595 14.2222 1.77778 13.8641 1.77778 13.4222V2.57778C1.77778 2.13595 2.13595 1.77778 2.57778 1.77778H13.4222C13.8641 1.77778 14.2222 2.13595 14.2222 2.57778V13.4222Z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default CropSquareSvg;
