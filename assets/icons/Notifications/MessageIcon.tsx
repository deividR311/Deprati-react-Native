import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from '../../../src/application/common';

function MessageIcon(props) {
  return (
    <Svg
      width={220}
      height={220}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={110} cy={110} r={110} fill={COLORS.GRAYBRAND} />
      <Path
        d="M166 54H54c-7.735 0-13.93 6.265-13.93 14L40 152c0 7.735 6.265 14 14 14h112c7.735 0 14-6.265 14-14V68c0-7.735-6.265-14-14-14zm0 28l-56 35-56-35V68l56 35 56-35v14z"
        fill={COLORS.BRAND}
      />
    </Svg>
  );
}

export default MessageIcon;
