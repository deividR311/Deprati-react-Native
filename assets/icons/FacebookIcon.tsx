import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function FacebookIcon(props) {
  return (
    <Svg
      width={22}
      height={23}
      viewBox="0 0 11 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.808 20.784H2.49V10.49H.333V6.958H2.49V4.84c0-2.887 1.222-4.598 4.679-4.598h2.882v3.531H8.253c-1.349 0-1.437.494-1.437 1.412v1.766h3.266l-.383 3.538h-2.89v10.295z"
        fill="#000"
      />
    </Svg>
  );
}

export default FacebookIcon;
