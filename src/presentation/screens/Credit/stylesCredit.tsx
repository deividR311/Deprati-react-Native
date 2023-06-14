import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import {
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../application/common/fonts';
import {
  HEIGHT_TAB_BAR,
  MARING_HORIZONTAL
} from '../../../application/common/layout';
import { fontWeightOS } from '../../../application/utils';

export const stylesCredit = StyleSheet.create({
  container: {
    paddingHorizontal: MARING_HORIZONTAL,
    backgroundColor: COLORS.WHITE,
    flex: 1,
    marginBottom: HEIGHT_TAB_BAR + 40
  },
  imageCard: {
    width: '100%',
    height: 236
  },
  container_nextPage: {
    backgroundColor: COLORS.WHITE
  },
  textHaveCredit: {
    ...FontStyles.Body_2,
    marginTop: 17,
    textAlign: 'justify'
  },
  container_services: {
    backgroundColor: COLORS.WHITE,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.DARK
  },
  container_moreservices: {
    backgroundColor: COLORS.WHITE,
    padding: MARING_HORIZONTAL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    marginVertical: 8,
    borderRadius: 8
  },
  container_services_text: {
    ...FontStyles.Button,
    fontSize: FONTS_SIZES.title1,
    lineHeight: 24
  },
  container_pago: {
    backgroundColor: COLORS.WHITE,
    padding: MARING_HORIZONTAL,
    borderRadius: 4,
    marginTop: 24
  },
  container_solicitar: {
    marginBottom: 0
  },
  container_solicitar_divider: {
    marginVertical: 20,
    height: 1
  },
  container_solicitar_subtitle: {
    ...FontStyles.H6_Headline,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: fontWeightOS('700'),
    color: COLORS.DARKBRAND,
    marginBottom: 8
  },
  container_solicitar_button: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: COLORS.DARK,
    borderWidth: 1
  },
  container_solicitar_button_text: {
    ...FontStyles.Button
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
    ...FontStyles.Body_2,
    textAlign: 'justify',
    width: '95%',
    marginBottom: 14
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
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    marginBottom: 8
  },

  cardMoreServices_textDesc: {
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Regular']
  },
  cardMoreServices_container: {
    backgroundColor: COLORS.WHITE,
    marginTop: 16,
    borderRadius: 4
  },

  // flujo not login

  card_carousel: {
    flex: 1,
    margin: 8,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center'
  },
  card_containerTitle: {
    width: '100%',
    justifyContent: 'center'
  },
  titleNextPay: {
    ...FontStyles.H3_Headline,
    textAlign: 'left'
  },
  dateNextPay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  dateNextPay_text: {
    ...FontStyles.Body_2,
    textAlign: 'left'
  },
  amountPay: {
    ...FontStyles.Subtitle,
    textAlign: 'left'
  }
});
