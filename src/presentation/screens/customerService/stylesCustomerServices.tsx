import { StyleSheet } from 'react-native';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../application/common';
import {
  HEIGHT_TAB_BAR,
  MARING_HORIZONTAL
} from '../../../application/common/layout';
import { fontFamilyOS } from '../../../application/utils';

export const stylesCustomerServices = StyleSheet.create({
  container: {
    paddingHorizontal: MARING_HORIZONTAL,
    backgroundColor: COLORS.WHITE,
    flex: 1,
    marginBottom: HEIGHT_TAB_BAR + 40
  },
  textHaveCredit: {
    ...FontStyles.Body_2,
    marginTop: 17,
    textAlign: 'justify'
  },
  container_services: {
    backgroundColor: COLORS.WHITE,
    padding: MARING_HORIZONTAL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 8
  },
  container_pago: {
    backgroundColor: COLORS.WHITE,
    padding: MARING_HORIZONTAL,
    borderRadius: 4,
    marginTop: 24
  },
  shadow: {
    shadowColor: COLORS.GRAYDARK60,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  text_services: {
    fontSize: FONTS_SIZES.legal,
    color: COLORS.GRAYDARK60,
    marginTop: 4
  },
  text_pago: {
    fontSize: FONTS_SIZES.super,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    marginBottom: 16
  },
  text_pago_subtitle: {
    textAlign: 'justify',
    fontSize: FONTS_SIZES.label,
    width: '80%',
    marginBottom: 14,
    lineHeight: 20
  },
  button_blocked: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: COLORS.WHITE
  },

  /// more services credit styles
  cardMoreServices_containerText: {
    padding: 16
  },

  cardMoreServices_textTitle: {
    fontSize: FONTS_SIZES.super,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
    // marginBottom: 16,
  },

  cardMoreServices_textDesc: {
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Regular']
  },
  cardMoreServices_container: {
    backgroundColor: COLORS.WHITE,
    marginTop: 24,
    borderRadius: 4
  },

  // flujo not login

  card_carousel: {
    borderRadius: 4,
    shadowColor: COLORS.DARK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    height: '100%',
    elevation: 4,
    marginRight: 16,
    backgroundColor: COLORS.WHITE,
    flex: 1
  },
  card_containerTitle: {
    padding: MARING_HORIZONTAL,
    flexGrow: 1,
    height: 90
  },
  // flujo login/vinculado

  titleNextPay: {
    fontSize: FONTS_SIZES.paragraph,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },

  dateNextPay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },

  amountPay: { fontFamily: FONTS_FAMILY['Roboto-Medium'] },
  containerTitle: {
    fontSize: FONTS_SIZES.super,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    marginBottom: 8
  },
  containerText: {
    marginBottom: 10,
    fontFamily: fontFamilyOS('Regular')
  },
  containerNumber: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginLeft: 10,
    marginBottom: 4
  },
  boxInfo: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  }
});
