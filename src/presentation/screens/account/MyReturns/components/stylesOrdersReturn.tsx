import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { fontWeightOS } from '../../../../../application/utils';

export const styles = StyleSheet.create({
  viewCard: {
    // marginTop: 11,
    marginVertical: 11,
    elevation: 4,
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingTop: 10
  },
  viewCard__contentSel: { width: '100%', height: 130, flexDirection: 'row' },
  viewCard__content: { width: '100%', height: 90, flexDirection: 'row' },
  containerTitle: {
    fontSize: FONTS_SIZES.subtitle2,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('700'),
    fontStyle: 'normal',
    letterSpacing: 1
    // lineHeight: 21,
  },

  subtitle: {
    fontSize: FONTS_SIZES.label,
    color: COLORS.GRAYDARK60,
    // fontFamily: FONTS_FAMILY.Roboto,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontStyle: 'normal',
    letterSpacing: 0.8
    // lineHeight:18
  },

  viewCard__content_image: { flex: 1 },
  viewCard__content_info: { width: '90%', height: '100%' },
  viewCard__content_info_view: { marginVertical: 10, marginHorizontal: 16 },
  viewCard__content_arrow: {
    width: '10%',
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25
    // backgroundColor:'cyan'
  },

  price: {
    fontSize: FONTS_SIZES.title2,
    color: COLORS.BRAND,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    textAlign: 'right'
  },

  buttonDetails: { alignSelf: 'center', width: '92%', marginBottom: 15 },
  textSolicit: { lineHeight: 16, letterSpacing: 0.75 }
});

export const stylesOrderEnter = StyleSheet.create({
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
  viewCard__content: { width: '100%', height: 'auto', flexDirection: 'row' },
  containerTitle: {
    fontSize: FONTS_SIZES.subtitle2,
    color: COLORS.GRAYDARK60,
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 1
    // lineHeight: 21,
  },

  subtitle: {
    fontSize: FONTS_SIZES.label,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    letterSpacing: 0.8
    // lineHeight:18
  },
  nameItem: {
    marginTop: 10,
    width: '100%'
  },
  viewCard__content_info: {
    width: '100%',
    height: '100%'
    // backgroundColor: 'orange',
  },
  viewCard__content_info_view: { marginVertical: 10, marginHorizontal: 16 },
  rowContainer: { width: '100%', flexDirection: 'row' },
  rowContainer_cant: { width: '75%', justifyContent: 'center' },
  rowContainer_Increase: {
    width: '25%',
    height: '100%'
    // justifyContent: 'center',
  },
  viewCardTotal: {
    borderRadius: 4,
    // marginTop: 11,
    // marginVertical: 11,
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

  buttonDetails: { alignSelf: 'center', width: '80%', marginBottom: 15 },
  textSolicit: { lineHeight: 16, letterSpacing: 0.75 }
});
