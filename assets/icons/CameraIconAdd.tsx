import React from 'react';
import Svg, { Circle, G, Path, SvgProps } from 'react-native-svg';
import { COLORS } from '../../src/application/common';

export default function CameraIconAdd(props: SvgProps) {
  return (
    <Svg width="64" height="64" viewBox="0 0 64 64" fill="none" {...props}>
      <G>
        <Circle cx="32" cy="32" r="32" fill={COLORS.GRAYBRAND} />
        <Path
          d="M31.9167 41.207C33.7778 41.207 35.3403 40.5751 36.6042 39.3112C37.8681 38.0473 38.5 36.4848 38.5 34.6237C38.5 32.7626 37.8681 31.207 36.6042 29.957C35.3403 28.707 33.7778 28.082 31.9167 28.082C30.0556 28.082 28.5 28.707 27.25 29.957C26 31.207 25.375 32.7626 25.375 34.6237C25.375 36.4848 26 38.0473 27.25 39.3112C28.5 40.5751 30.0556 41.207 31.9167 41.207ZM18.5 46.9987C17.8611 46.9987 17.3056 46.7626 16.8333 46.2904C16.3611 45.8181 16.125 45.2626 16.125 44.6237V24.6237C16.125 23.9848 16.3611 23.4293 16.8333 22.957C17.3056 22.4848 17.8611 22.2487 18.5 22.2487H24.25L26.5833 19.4987C26.7778 19.2209 27.0347 19.0126 27.3542 18.8737C27.6736 18.7348 28.0139 18.6654 28.375 18.6654H37.375C37.7083 18.6654 37.9931 18.7834 38.2292 19.0195C38.4653 19.2556 38.5833 19.5404 38.5833 19.8737V24.1237L18.5 24.6237H18V44.6237C18 44.7626 18.0486 44.8806 18.1458 44.9779C18.2431 45.0751 18.3611 45.1237 18.5 45.1237H45.375C45.5139 45.1237 45.6319 45.0751 45.7292 44.9779C45.8264 44.8806 45.875 44.7626 45.875 44.6237V28.707H46.5833C46.4722 28.707 46.4722 28.7418 46.5833 28.8112C46.6944 28.8806 46.8333 28.9709 47 29.082C47.1667 29.1931 47.3403 29.3251 47.5208 29.4779C47.7014 29.6306 47.7917 29.7765 47.7917 29.9154V44.6237C47.7917 45.2626 47.5486 45.8181 47.0625 46.2904C46.5764 46.7626 46.0139 46.9987 45.375 46.9987H18.5ZM45.9167 21.4154H43.3333C43.0556 21.4154 42.8264 21.3181 42.6458 21.1237C42.4653 20.9293 42.375 20.707 42.375 20.457C42.375 20.1793 42.4653 19.9501 42.6458 19.7695C42.8264 19.589 43.0556 19.4987 43.3333 19.4987H45.9167V16.9154C45.9167 16.6376 46.0069 16.4084 46.1875 16.2279C46.3681 16.0473 46.5833 15.957 46.8333 15.957C47.1111 15.957 47.3403 16.0473 47.5208 16.2279C47.7014 16.4084 47.7917 16.6376 47.7917 16.9154V19.4987H50.375C50.6528 19.4987 50.8819 19.589 51.0625 19.7695C51.2431 19.9501 51.3333 20.1793 51.3333 20.457C51.3333 20.7348 51.2431 20.964 51.0625 21.1445C50.8819 21.3251 50.6528 21.4154 50.375 21.4154H47.7917V23.957C47.7917 24.2348 47.7014 24.464 47.5208 24.6445C47.3403 24.8251 47.1111 24.9154 46.8333 24.9154C46.5556 24.9154 46.3333 24.8251 46.1667 24.6445C46 24.464 45.9167 24.2348 45.9167 23.957V21.4154Z"
          fill="#E31A2C"
        />
      </G>
    </Svg>
  );
}