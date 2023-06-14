import { StyleSheet } from 'react-native';
import { FONTS_FAMILY } from './fonts';
import { fontWeightOS } from '../utils';
import layout from './layout';
import { COLORS } from './colors';

export const globalStyles = StyleSheet.create({
  divider: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 12
  },
  baseStyle: {
    fontFamily: FONTS_FAMILY.Roboto
  },
  scrollViewStyle: {
    backgroundColor: COLORS.WHITE
  }
});
export const htmlStyles = StyleSheet.create({
  h1: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('700')
  },
  li: {
    fontFamily: layout.isIos
      ? FONTS_FAMILY['Roboto-Medium']
      : FONTS_FAMILY['Roboto-Bold'],
    fontWeight: fontWeightOS('700')
  }
});
