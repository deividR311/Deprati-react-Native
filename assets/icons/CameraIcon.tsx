import * as React from 'react';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  SvgProps
} from 'react-native-svg';

export default function CameraIcon(props: SvgProps) {
  return (
    <Svg width="64" height="64" viewBox="0 0 64 64" fill="none" {...props}>
      <G>
        <Circle cx="32" cy="32" r="32" fill="#cfcfcf" />
        <G clip-path="url(#clip0_71351_120839)">
          <Path
            d="M32.0013 37.7008C34.9468 37.7008 37.3346 35.3727 37.3346 32.5008C37.3346 29.6289 34.9468 27.3008 32.0013 27.3008C29.0558 27.3008 26.668 29.6289 26.668 32.5008C26.668 35.3727 29.0558 37.7008 32.0013 37.7008Z"
            fill="#E31A2C"
          />
          <Path
            d="M26.9987 16.25L23.9487 19.5H18.6654C16.8237 19.5 15.332 20.9544 15.332 22.75V42.25C15.332 44.0456 16.8237 45.5 18.6654 45.5H45.332C47.1737 45.5 48.6654 44.0456 48.6654 42.25V22.75C48.6654 20.9544 47.1737 19.5 45.332 19.5H40.0487L36.9987 16.25H26.9987ZM31.9987 40.625C27.3987 40.625 23.6654 36.985 23.6654 32.5C23.6654 28.015 27.3987 24.375 31.9987 24.375C36.5987 24.375 40.332 28.015 40.332 32.5C40.332 36.985 36.5987 40.625 31.9987 40.625Z"
            fill="#E31A2C"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_71351_120839">
          <Rect
            width="40"
            height="39"
            fill="white"
            transform="translate(12 13)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
