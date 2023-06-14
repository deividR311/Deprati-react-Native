import { StyleSheet } from 'react-native';
import { COLORS, FONTS_FAMILY } from '../../../../application/common';
import { fontWeightOS } from '../../../../application/utils';

export const styles = StyleSheet.create({
  container: {
    padding: 18
    // paddingBottom: 64,
  },
  space: {
    height: 16
  },
  terms: {
    color: COLORS.BRAND,
    fontFamily: FONTS_FAMILY['Roboto-Regular']
  },
  title: {
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontWeight: '400',
    fontSize: 14,
    color: COLORS.DARK70
  },
  subTitle: {
    textAlign: 'left',
    marginBottom: 4,
    fontSize: 16,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('700'),
    lineHeight: 24,
    letterSpacing: 0.44
  },
  viewInput: { marginVertical: 20 },
  description: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: FONTS_FAMILY.Roboto,
    letterSpacing: 0.25
  },
  check: { paddingHorizontal: 10 },
  viewButton: { paddingHorizontal: 15, marginTop: 15 },
  button: { width: '100%' }
});

export const stylesPopup = StyleSheet.create({
  contentStyle: { maxWidth: '90%' },
  contentSuccessStyle: { width: '92%' },
  titleStyle: { textAlign: 'left' },
  containerButtonsStyle: {
    flexDirection: 'column-reverse',
    alignSelf: 'center',
    width: '100%'
  },
  buttonTextStyle: {
    textDecorationLine: 'none',
    color: COLORS.DARK,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    textAlign: 'center',
    marginTop: -18,
    width: '100%'
  },
  secondButtonTextStyle: {
    textDecorationLine: 'none',
    backgroundColor: COLORS.BRAND,
    color: COLORS.WHITE,
    width: '100%',
    textAlign: 'center',
    padding: 8,
    borderRadius: 4
  }
});
