import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ClockSvg(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 45}
      height={props.height ?? 45}
      viewBox="0 0 45 45"
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.977 0.332031C10.017 0.332031 0.332031 10.0387 0.332031 21.9987C0.332031 33.9587 10.017 43.6654 21.977 43.6654C33.9587 43.6654 43.6654 33.9587 43.6654 21.9987C43.6654 10.0387 33.9587 0.332031 21.977 0.332031ZM21.9987 39.332C12.422 39.332 4.66536 31.5754 4.66536 21.9987C4.66536 12.422 12.422 4.66536 21.9987 4.66536C31.5754 4.66536 39.332 12.422 39.332 21.9987C39.332 31.5754 31.5754 39.332 21.9987 39.332ZM19.832 11.1654H23.082V22.5404L32.832 28.3254L31.207 30.9904L19.832 24.1654V11.1654Z"
        fill={props.fill ?? '#EB0029'}
      />
    </Svg>
  );
}

export default ClockSvg;
