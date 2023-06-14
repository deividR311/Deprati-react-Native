import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Svg, { Path, SvgProps } from 'react-native-svg';

function ListBulletSvg(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 20}
      height={props.height ?? 20}
      viewBox="0 0 16 16"
      fill="red">
      <Path
        d="M0 14.8571C0 15.4883 0.511674 16 1.14286 16H9.85714C10.4883 16 11 15.4883 11 14.8571V14.8571C11 14.226 10.4883 13.7143 9.85714 13.7143H1.14286C0.511675 13.7143 0 14.226 0 14.8571V14.8571ZM0 8C0 8.63118 0.511675 9.14286 1.14286 9.14286H9.85714C10.4883 9.14286 11 8.63118 11 8V8C11 7.36882 10.4883 6.85714 9.85714 6.85714H1.14286C0.511674 6.85714 0 7.36882 0 8V8ZM1.14286 0C0.511674 0 0 0.511675 0 1.14286V1.14286C0 1.77404 0.511675 2.28571 1.14286 2.28571H9.85714C10.4883 2.28571 11 1.77404 11 1.14286V1.14286C11 0.511675 10.4883 0 9.85714 0H1.14286Z"
        fill={props.fill}
      />
      <Path
        d="M13 14.8571C13 15.4883 13.5117 16 14.1429 16H14.8571C15.4883 16 16 15.4883 16 14.8571V14.8571C16 14.226 15.4883 13.7143 14.8571 13.7143H14.1429C13.5117 13.7143 13 14.226 13 14.8571V14.8571ZM13 8C13 8.63118 13.5117 9.14286 14.1429 9.14286H14.8571C15.4883 9.14286 16 8.63118 16 8V8C16 7.36882 15.4883 6.85714 14.8571 6.85714H14.1429C13.5117 6.85714 13 7.36882 13 8V8ZM14.1429 0C13.5117 0 13 0.511675 13 1.14286V1.14286C13 1.77404 13.5117 2.28571 14.1429 2.28571H14.8571C15.4883 2.28571 16 1.77404 16 1.14286V1.14286C16 0.511675 15.4883 0 14.8571 0H14.1429Z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default ListBulletSvg;
