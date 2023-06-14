import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

const CircularInformationIcon = React.memo((props: SvgProps) => (
  <Svg width={73} height={72} fill="none" {...props}>
    <Rect x={0.5} width={72} height={72} rx={36} fill="#FFC700" />
    <Path
      d="M34.88 48h3.6V33.6h-3.6V48Zm1.619-18.84c.56 0 1.031-.184 1.411-.552.38-.368.57-.824.57-1.368 0-.578-.19-1.063-.569-1.453a1.886 1.886 0 0 0-1.41-.587 1.89 1.89 0 0 0-1.411.587c-.38.39-.57.875-.57 1.453 0 .544.19 1 .569 1.368.38.368.85.552 1.41.552ZM36.516 60c-3.31 0-6.42-.63-9.33-1.89-2.91-1.26-5.456-2.98-7.636-5.16-2.18-2.18-3.9-4.727-5.16-7.64-1.26-2.914-1.89-6.027-1.89-9.34 0-3.313.63-6.426 1.89-9.34 1.26-2.913 2.98-5.45 5.16-7.61s4.727-3.87 7.64-5.13c2.914-1.26 6.027-1.89 9.34-1.89 3.313 0 6.426.63 9.34 1.89 2.913 1.26 5.45 2.97 7.61 5.13 2.16 2.16 3.87 4.7 5.13 7.62 1.26 2.92 1.89 6.035 1.89 9.344 0 3.31-.63 6.42-1.89 9.33-1.26 2.91-2.97 5.452-5.13 7.625-2.16 2.173-4.7 3.893-7.62 5.16C42.94 59.366 39.825 60 36.516 60Zm.014-3.6c5.66 0 10.47-1.99 14.43-5.97 3.96-3.98 5.94-8.8 5.94-14.46s-1.976-10.47-5.929-14.43C47.02 17.58 42.195 15.6 36.5 15.6c-5.64 0-10.45 1.976-14.43 5.929C18.09 25.48 16.1 30.305 16.1 36c0 5.64 1.99 10.45 5.97 14.43 3.98 3.98 8.8 5.97 14.46 5.97Z"
      fill="#263238"
    />
  </Svg>
));

export default CircularInformationIcon;