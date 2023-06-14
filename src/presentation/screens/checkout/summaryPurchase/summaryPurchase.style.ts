import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  FontStyles,
  MARING_HORIZONTAL
} from '../../../../application/common';
import { fontFamilyOS, fontWeightOS } from '../../../../application/utils';

export const styles = StyleSheet.create({
  summaryPurchase: {},
  summaryPurchase_description: {
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: MARING_HORIZONTAL,
    alignItems: 'center'
  },
  summaryPurchase_title: {
    ...FontStyles.Body_1,
    textAlign: 'center',
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  summaryPurchase_subtitle: {
    ...FontStyles.Body_1,
    fontSize: FONTS_SIZES.paragraph,
    textAlign: 'center'
  },
  summaryPurchase_delivery_accordion: {
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: COLORS.GRAYDARK60,
    height: 50,
    justifyContent: 'center',
    width: '100%'
  },
  summaryPurchase_delivery_accordion_text: {
    ...FontStyles.Regular,
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('500'),
    color: COLORS.DARK70
  },
  summaryPurchase_check: {
    alignSelf: 'center',
    marginTop: 24,
    borderColor: COLORS.GRAYDARK60,
    paddingBottom: 10
  },
  summaryPurchase_check_text: {
    ...FontStyles.Regular,
    textAlign: 'justify',
    color: COLORS.DARK70,
    fontWeight: fontWeightOS('600'),
    width: '85%'
  },
  summaryPurchase_check_show: {
    color: COLORS.BRAND
  },
  summaryPurchase_weight: {
    ...FontStyles.Caption,
    textAlign: 'center',
    paddingVertical: 24
  },
  summaryPurchase_delivery_accordion_content: {
    marginVertical: 16,
    paddingHorizontal: 16,
    width: '100%'
  },
  summaryPurchase_line: {
    backgroundColor: COLORS.GRAYDARK60,
    height: 0.5,
    width: '85%',
    marginTop: 4,
    alignSelf: 'center'
  }
});
