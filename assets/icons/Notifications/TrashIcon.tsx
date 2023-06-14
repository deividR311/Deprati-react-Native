import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TrashIcon(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8 25.333A2.666 2.666 0 0010.665 28h10.667a2.666 2.666 0 002.666-2.667v-16H8v16zm17.333-20h-4.667L19.333 4h-6.667l-1.333 1.333H6.666V8h18.667V5.333z"
        fill="#fff"
      />
    </Svg>
  );
}

export default TrashIcon;
