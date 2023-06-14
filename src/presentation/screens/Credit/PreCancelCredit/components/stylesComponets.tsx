import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common';
import { fontWeightOS } from '../../../../../application/utils';

export const stylesCardDeferred = StyleSheet.create({
  viewCard: {
    borderRadius: 4,
    // marginTop: 11,
    marginVertical: 11,
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2
  },
  container: { width: '100%', height: 100, flexDirection: 'row' },
  unchecked: { backgroundColor: COLORS.WHITE },
  checked: { backgroundColor: COLORS.GRAYDARK20 },
  left: { width: '15%', alignItems: 'center' },
  right: { width: '85%' },
  justifyContent: { justifyContent: 'center' },
  subtitle: {
    fontSize: FONTS_SIZES.label,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    letterSpacing: 0.8
    // lineHeight:18
  },
  pending: {
    fontSize: FONTS_SIZES.subtitle2,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('700'),
    fontStyle: 'normal',
    letterSpacing: 1
    // lineHeight: 21,
  }
});
