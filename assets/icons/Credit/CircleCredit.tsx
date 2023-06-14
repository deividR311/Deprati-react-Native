import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../../src/application/common';

function CircleCredit(props) {
  return (
    <Svg
      width={232}
      height={232}
      viewBox="0 0 232 232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18.585 162.846c-3.935 1.893-8.686.245-10.306-3.81A115.997 115.997 0 0159.934 14.449a116 116 0 01163.752 144.675c-1.623 4.054-6.376 5.697-10.309 3.802-3.934-1.896-5.554-6.612-3.975-10.683a100.18 100.18 0 00-8.553-89.518 100.18 100.18 0 00-84.808-46.913 100.188 100.188 0 00-93.473 136.355c1.576 4.072-.048 8.787-3.983 10.679z"
        fill={COLORS.GRAYBRAND}
      />
      <Path
        d="M18.585 162.846c-3.935 1.893-8.686.245-10.306-3.81A115.999 115.999 0 0122.556 47.267c2.587-3.517 7.6-3.918 10.933-1.097 3.333 2.82 3.72 7.793 1.17 11.338a100.187 100.187 0 00-12.09 94.659c1.575 4.072-.049 8.787-3.984 10.679z"
        fill={COLORS.BRAND}
      />
    </Svg>
  );
}

export default CircleCredit;
