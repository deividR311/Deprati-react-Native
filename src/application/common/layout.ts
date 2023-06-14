import { Dimensions, Platform, StatusBar } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const BarTopHeight = StatusBar.currentHeight;
export const HEIGHT_TAB_BAR = 70;
export const MARING_HORIZONTAL = 16;

export const SHADOW_CARD = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 2
};

export default {
  window: {
    width,
    height
  },
  BarTopHeight,
  isSmallDevice: width < 376,
  isIos: Platform.OS === 'ios'
};
