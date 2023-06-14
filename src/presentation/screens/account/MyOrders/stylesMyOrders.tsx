import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES,
  FontStyles
} from '../../../../application/common/fonts';
import { fontFamilyOS, fontWeightOS } from '../../../../application/utils';

export const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '95%',
    alignSelf: 'center'
    // backgroundColor: 'red',
  },
  dateOrdersMade: {
    backgroundColor: COLORS.GRAYBRAND50,
    paddingRight: 30,
    height: 32,
    justifyContent: 'center'
  },
  dateOrdersMade_text: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.label,
    letterSpacing: 1,
    textAlign: 'right',
    color: COLORS.DARK
    // lineHeight: 16,
  },
  headerOrderActive: {
    marginLeft: 16,
    marginTop: 20,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  headerOrderMade: {
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  noOrders: { flex: 1, justifyContent: 'center', alignSelf: 'center' },
  textNoOrders: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.title2,
    letterSpacing: 1,
    color: COLORS.DARK
  },
  container__typeOrder: {
    backgroundColor: COLORS.GRAYDARK20,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center'
  },
  container__typeOrder_title: {
    ...FontStyles.H3_Headline,
    fontSize: FONTS_SIZES.title1,
    textAlign: 'left',
    marginBottom: 4
  },
  container__typeOrder_subtitle: {
    ...FontStyles.Body_2,
    textAlign: 'left',
    marginBottom: 4
  },
  row__separator: {
    height: 1,
    alignSelf: 'center',
    backgroundColor: COLORS.GRAYBRAND,
    marginTop: 8,
    marginBottom: 16,
    width: '85%'
  },
  orderOnline: {},
  orderOnline_title: {
    ...FontStyles.H3_Headline,
    fontSize: FONTS_SIZES.title1,
    textAlign: 'left',
    marginBottom: 24,
    paddingLeft: 16
  },
  orderOnline_section_title: {
    ...FontStyles.H3_Headline,
    fontSize: FONTS_SIZES.title1,
    textAlign: 'left',
    paddingLeft: 16
  },
  orderOnline_section_subtitle: {
    ...FontStyles.Body_2,
    textAlign: 'left',
    paddingLeft: 16
  },
  orderContactless_emptyStatus: {
    backgroundColor: COLORS.GRAYDARK20,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden'
  },
  orderContactless_emptyStatus_title: {
    ...FontStyles.Subtitle_1,
    textAlign: 'center',
    marginBottom: 4
  },
  orderContactless_emptyStatus_subtitle: {
    ...FontStyles.Body_2,
    textAlign: 'center'
  },
  orderContactless_emptyStatus_checkMarkIcon: {
    textAlign: 'center',
    backgroundColor: COLORS.ALERTWARNING
  },
  orderContactless_emptyStatus_cicle: {
    paddingLeft: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    backgroundColor: COLORS.ALERTWARNING,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 16
  },
  orderContactless_emptyStatus_btn: {
    alignSelf: 'center',
    width: '80%'
  },
  orderOnline_nextMore_contain: {
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16
  },
  orderOnline_nextMore_contain_text: {
    ...FontStyles.Subtitle_1,
    color: COLORS.BRAND,
    marginVertical: 8,
    textDecorationLine: 'underline'
  }
});
