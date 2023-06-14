import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function GoogleIcon(props) {
  return (
    <Svg
      width={22}
      height={23}
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1.502 6.322a9.208 9.208 0 011.8-2.584 10.792 10.792 0 0114.896-.8c.168.144.208.224 0 .4-.912.888-1.8 1.792-2.696 2.688-.096.088-.16.2-.32.056a6.208 6.208 0 00-8.36.184 6.928 6.928 0 00-1.8 2.744 6.832 6.832 0 000 4.232c.307.826.76 1.59 1.336 2.256a6.352 6.352 0 005.672 2.168 6.857 6.857 0 002.88-.992 5.6 5.6 0 001.688-2c.148-.327.271-.664.368-1.008.072-.232.048-.328-.248-.32H11.51c-.368 0-.368 0-.368-.384V9.41c0-.224 0-.312.296-.312h9.656c.168 0 .28 0 .312.224a11.896 11.896 0 01-1.392 8 8.16 8.16 0 01-1.672 2.032 9.072 9.072 0 01-4.056 2.216 10.927 10.927 0 01-9.92-2 10.065 10.065 0 01-2.864-3.576 9.936 9.936 0 01-1.064-3.416 10.744 10.744 0 01.872-5.976c.048-.104.104-.2.16-.304"
        fill="#000"
      />
    </Svg>
  );
}

export default GoogleIcon;
