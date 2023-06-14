import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';

export const stylesModalSelect = StyleSheet.create({
  rowContainer: { marginHorizontal: 8, paddingVertical: 8 },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    color: COLORS.DARK
  },

  text2: {
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    color: COLORS.DARK
  }
});
