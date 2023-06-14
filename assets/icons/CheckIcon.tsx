import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CheckIcon(props) {
  return (
    <Svg
      width={72}
      height={72}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M36 0C16.11 0 0 16.11 0 36c0 19.872 16.11 36 36 36 19.872 0 36-16.128 36-36C72 16.11 55.872 0 36 0zm-7.2 54l-18-18 5.094-5.094L28.8 43.812l27.306-27.306L61.2 21.6 28.8 54z"
        fill="#00CF14"
      />
    </Svg>
  );
}

export default CheckIcon;
