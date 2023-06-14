import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import {
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../application/common/fonts';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';

export const stylesSignUp = StyleSheet.create({
  inputRow: { marginRight: 8 },
  inputStyle: { width: '100%', marginTop: 16 },
  labelTitle: {
    marginTop: 20,
    marginBottom: 16,
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: '500',
    color: COLORS.DARK70
  },
  checkboxContainer: {
    marginTop: 18,
    width: '95%'
  },

  text: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: FONTS_SIZES.badge,
    color: COLORS.ALERTSELECTED
  },
  text2: {
    textDecorationLine: 'underline',
    fontSize: FONTS_SIZES.badge,
    color: COLORS.ALERTSELECTED
  },
  textLink: {
    flexWrap: 'wrap',
    fontSize: FONTS_SIZES.badge,
    color: COLORS.BRAND,
    fontWeight: 'bold'
  },
  termsText: {
    ...FontStyles.Body_2,
    color: COLORS.DARK70
  },
  termsLink: {
    ...FontStyles.Body_2,
    color: COLORS.BRAND,
    fontFamily: fontFamilyOS('Regular')
  },
  termsLink2: {
    ...FontStyles.Body_2,
    color: COLORS.BRAND,
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700')
  },
  web: {
    ...FontStyles.Body_2,
    fontWeight: 'bold'
  },
  boxShadow: {
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    height: 65,
    width: '100%',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10
  },

  tabShadow: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    height: 12
  },
  bottomNav: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingTop: 12
  },
  viewArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.DARK
  },
  stepText: {
    fontSize: FONTS_SIZES.badge,
    fontFamily: fontFamilyOS('Regular'),
    fontWeight: fontWeightOS('200'),
    color: COLORS.DARK
  },
  viewTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  titleBottom: {
    fontSize: FONTS_SIZES.subtitle1,
    color: COLORS.DARK,
    fontFamily: fontFamilyOS('Regular')
  },
  textArrow: {
    fontFamily: fontFamilyOS('Regular'),
    fontSize: FONTS_SIZES.badge,
    color: COLORS.DARK
  },
  lineStep: {
    marginTop: 8,
    marginBottom: Platform.select({
      android: 8,
      ios: 0
    }),
    height: 3,
    width: 40,
    backgroundColor: COLORS.BRAND
  },
  cardImage: {
    width: 235,
    height: 143,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 32
  },
  titleCredit: {
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16
  },
  subtitle1: {
    fontSize: FONTS_SIZES.subtitle1,
    lineHeight: 24,
    textAlign: 'center',
    width: '100%',
    alignSelf: 'center',
    color: COLORS.DARK,
    marginBottom: 24,
    fontFamily: FONTS_FAMILY.Roboto
  }
});
