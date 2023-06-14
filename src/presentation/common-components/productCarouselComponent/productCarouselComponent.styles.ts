import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  MARING_HORIZONTAL
} from '../../../application/common';

export const stylesproductCarousel = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    marginTop: 16
  },
  container__title: {
    paddingLeft: MARING_HORIZONTAL,
    marginTop: 15
  },
  container__title_text: {
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: '500',
    color: COLORS.DARK70
  },
  container__categories: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
