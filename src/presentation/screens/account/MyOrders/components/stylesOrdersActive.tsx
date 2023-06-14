import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { fontWeightOS } from '../../../../../application/utils';

export const styles = StyleSheet.create({
  viewCard: {
    borderRadius: 4,
    marginVertical: 11,
    backgroundColor: COLORS.WHITE,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27
  },
  viewCard__content: {
    flex: 1,
    width: '100%',
    flexDirection: 'row'
  },
  containerTitle: {
    fontSize: FONTS_SIZES.label,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('700'),
    fontStyle: 'normal',
    letterSpacing: 0.8,
    lineHeight: 21
  },

  subtitle: {
    fontSize: FONTS_SIZES.small,
    color: COLORS.GRAYDARK60,
    // fontFamily: FONTS_FAMILY.Roboto,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontStyle: 'normal',
    letterSpacing: 0.8
  },

  viewCard__content_image: { width: '30%', maxHeight: 150 },
  viewCard__content_info: {
    width: '62%',
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 16
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 0
  },
  price: {
    alignSelf: 'flex-end',
    fontSize: FONTS_SIZES.small,
    color: COLORS.BRAND,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'right',
    letterSpacing: 0.8,
    paddingTop: 10
  }
});
