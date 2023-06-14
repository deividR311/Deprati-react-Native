import * as React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect, SvgProps } from 'react-native-svg';

const HomeShopPay = (props: SvgProps & { size?: number }) => (
  <Svg width={22} height={28} viewBox="0 0 22 28" fill="none" {...props}>
    <Path
      d="M19.5556 0H7.33336C5.98892 0 4.88892 1.14545 4.88892 2.54545V6.36364H7.33336V3.81818H19.5556V24.1818H7.33336V21.6364H4.88892V25.4545C4.88892 26.8545 5.98892 28 7.33336 28H19.5556C20.9 28 22 26.8545 22 25.4545V2.54545C22 1.14545 20.9 0 19.5556 0Z"
      fill={`${props.fill?.toString() || 'black'}`}
    />
    <G clipPath="url(#clip0_64598_14509)">
      <Path
        d="M0 19.9991H5.5518V14.4473H0V19.9991ZM1.11 15.5591H4.44V18.8813H1.11V15.5591Z"
        fill={`${props.fill?.toString() || 'black'}`}
      />
      <Path
        d="M3.28798 16.7109H2.17798V17.8215H3.28798V16.7109Z"
        fill={`${props.fill?.toString() || 'black'}`}
      />
      <Path
        d="M9.82203 18.8887H8.71143V19.9993H9.82203V18.8887Z"
        fill={`${props.fill?.toString() || 'black'}`}
      />
      <Path
        d="M12 18.8887H10.8894V19.9993H12V18.8887Z"
        fill={`${props.fill?.toString() || 'black'}`}
      />
      <Path
        d="M10.8894 15.5579H9.77944V14.4473H6.44824V19.9991H7.55884V16.6679H8.66884V17.7785H12V14.4473H10.8894V15.5579Z"
        fill={`${props.fill?.toString() || 'black'}`}
      />
      <Path
        d="M0 13.5518H5.5518V8H0V13.5518ZM1.11 9.1118H4.44V12.44H1.11V9.1118Z"
        fill={`${props.fill?.toString() || 'black'}`}
      />
      <Path
        d="M3.28798 10.1777H2.17798V11.2883H3.28798V10.1777Z"
        fill={`${props.fill?.toString() || 'black'}`}
      />
      <Path
        d="M6.44824 8V13.5518H12V8H6.44824ZM10.8882 12.44H7.55705V9.11H10.8882V12.44Z"
        fill={`${props.fill?.toString() || 'black'}`}
      />
      <Path
        d="M9.82203 10.1777H8.71143V11.2883H9.82203V10.1777Z"
        fill={`${props.fill?.toString() || 'black'}`}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_64598_14509">
        <Rect width={12} height={12} fill="white" transform="translate(0 8)" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default HomeShopPay;
