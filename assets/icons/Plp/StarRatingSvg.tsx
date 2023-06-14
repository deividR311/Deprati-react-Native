import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function StarSvg(props: SvgProps) {
  const color = props?.color ?? '#FF9016';
  return (
    <Svg
      width={props.width ?? 20}
      height={props.height ?? 20}
      viewBox="0 0 16 15"
      fill="none">
      <Path
        d="M8.17748 11.4122L12.7257 14.1817L11.5224 8.96194L15.5371 5.45363L10.2455 4.99328L8.17748 0.0742188L6.10943 4.99328L0.817871 5.45363L4.83254 8.96194L3.62924 14.1817L8.17748 11.4122Z"
        fill={color}
      />
    </Svg>
  );
}
const StarRatingSvg = React.memo(StarSvg);
export default StarRatingSvg;
