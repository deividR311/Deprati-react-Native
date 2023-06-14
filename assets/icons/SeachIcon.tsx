import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../src/application/common';

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.943 0a5.943 5.943 0 015.943 5.943c0 1.472-.54 2.825-1.427 3.867l.247.247h.723L16 14.63 14.629 16l-4.572-4.571v-.723l-.247-.247a5.957 5.957 0 01-3.867 1.427A5.943 5.943 0 115.943 0zm0 1.829a4.097 4.097 0 00-4.114 4.114 4.097 4.097 0 004.114 4.114 4.097 4.097 0 004.114-4.114 4.097 4.097 0 00-4.114-4.114z"
        fill={COLORS.DARK70}
      />
    </Svg>
  );
}

export default SvgComponent;
