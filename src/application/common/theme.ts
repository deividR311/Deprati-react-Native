import { DefaultTheme, configureFonts } from 'react-native-paper';
import { Fonts } from 'react-native-paper/lib/typescript/types';
type FontConfig = {
  ios?: Fonts;
  android?: Fonts;
  default?: Fonts;
};
const fontConfig: FontConfig = {
  // ios: {
  //   regular: {
  //     fontFamily: 'Roboto-Regular',
  //     fontWeight: 'normal',
  //   },
  //   medium: {
  //     fontFamily: 'Roboto-Regular',
  //     fontWeight: 'normal',
  //   },
  // },
  android: {
    regular: {
      fontFamily: 'Roboto-Regular'
    },
    medium: {
      fontFamily: 'Roboto-Medium'
    },
    light: {
      fontFamily: 'Roboto-Regular'
    },
    thin: {
      fontFamily: 'Roboto-Regular'
    }
  },
  default: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'Roboto-Medium'
    },
    light: {
      fontFamily: 'Roboto-Regular'
    },
    thin: {
      fontFamily: 'Roboto-Regular'
    }
  }
};

export const APP_THEME = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...configureFonts(fontConfig)
  }
};

export default APP_THEME;
